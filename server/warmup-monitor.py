#!/usr/bin/env python3
"""
Beacon Momentum Email Warm-Up Monitor
Tracks daily sending metrics and alerts on KPI violations
"""

import sqlite3
import os
from datetime import datetime, date
import json

# Configuration
DB_PATH = "/home/ubuntu/beacon-warmup.db"
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY", "")

class WarmUpMonitor:
    def __init__(self, db_path=DB_PATH):
        self.db_path = db_path
        self.conn = None
        
    def connect(self):
        """Connect to the warm-up database"""
        self.conn = sqlite3.connect(self.db_path)
        self.conn.row_factory = sqlite3.Row
        return self.conn
    
    def close(self):
        """Close database connection"""
        if self.conn:
            self.conn.close()
    
    def get_today_schedule(self):
        """Get today's warm-up schedule"""
        cursor = self.conn.cursor()
        today = date.today().isoformat()
        cursor.execute("""
            SELECT * FROM warmup_schedule 
            WHERE date = ? 
            LIMIT 1
        """, (today,))
        return cursor.fetchone()
    
    def log_daily_metrics(self, metrics):
        """
        Log daily sending metrics
        
        Args:
            metrics (dict): Dictionary with keys:
                - emails_sent
                - emails_delivered
                - emails_bounced
                - emails_opened
                - emails_clicked
                - spam_complaints
                - unsubscribes
        """
        cursor = self.conn.cursor()
        today = date.today().isoformat()
        
        # Calculate rates
        sent = metrics.get('emails_sent', 0)
        if sent > 0:
            delivery_rate = (metrics.get('emails_delivered', 0) / sent) * 100
            bounce_rate = (metrics.get('emails_bounced', 0) / sent) * 100
            spam_rate = (metrics.get('spam_complaints', 0) / sent) * 100
            unsubscribe_rate = (metrics.get('unsubscribes', 0) / sent) * 100
        else:
            delivery_rate = bounce_rate = spam_rate = unsubscribe_rate = 0.0
        
        delivered = metrics.get('emails_delivered', 0)
        if delivered > 0:
            open_rate = (metrics.get('emails_opened', 0) / delivered) * 100
            click_rate = (metrics.get('emails_clicked', 0) / delivered) * 100
        else:
            open_rate = click_rate = 0.0
        
        # Determine status
        status = 'good'
        if bounce_rate > 5.0 or spam_rate > 0.1:
            status = 'critical'
        elif bounce_rate > 2.0 or spam_rate > 0.05 or open_rate < 15.0:
            status = 'warning'
        
        # Get day number from schedule
        schedule = self.get_today_schedule()
        day_number = schedule['day_number'] if schedule else 0
        
        # Insert or update metrics
        cursor.execute("""
            INSERT OR REPLACE INTO daily_metrics (
                date, day_number, emails_sent, emails_delivered, emails_bounced,
                emails_opened, emails_clicked, spam_complaints, unsubscribes,
                delivery_rate, bounce_rate, open_rate, click_rate, 
                spam_rate, unsubscribe_rate, status, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        """, (
            today, day_number, sent, metrics.get('emails_delivered', 0),
            metrics.get('emails_bounced', 0), metrics.get('emails_opened', 0),
            metrics.get('emails_clicked', 0), metrics.get('spam_complaints', 0),
            metrics.get('unsubscribes', 0), delivery_rate, bounce_rate,
            open_rate, click_rate, spam_rate, unsubscribe_rate, status
        ))
        
        self.conn.commit()
        return status
    
    def check_kpi_thresholds(self):
        """Check if any KPIs have exceeded thresholds"""
        cursor = self.conn.cursor()
        today = date.today().isoformat()
        
        # Get today's metrics
        cursor.execute("SELECT * FROM daily_metrics WHERE date = ?", (today,))
        metrics = cursor.fetchone()
        
        if not metrics:
            return []
        
        # Get KPI thresholds
        cursor.execute("SELECT * FROM kpi_thresholds WHERE alert_enabled = 1")
        thresholds = cursor.fetchall()
        
        alerts = []
        for threshold in thresholds:
            metric_name = threshold['metric_name']
            current_value = metrics[metric_name] if metric_name in metrics.keys() else None
            
            if current_value is None:
                continue
            
            # Check for violations
            severity = None
            threshold_value = None
            
            if threshold['critical_threshold'] is not None:
                if metric_name in ['bounce_rate', 'spam_rate', 'unsubscribe_rate']:
                    # Higher is worse
                    if current_value >= threshold['critical_threshold']:
                        severity = 'critical'
                        threshold_value = threshold['critical_threshold']
                else:
                    # Lower is worse (open_rate, click_rate, delivery_rate)
                    if current_value <= threshold['critical_threshold']:
                        severity = 'critical'
                        threshold_value = threshold['critical_threshold']
            
            if severity is None and threshold['warning_threshold'] is not None:
                if metric_name in ['bounce_rate', 'spam_rate', 'unsubscribe_rate']:
                    if current_value >= threshold['warning_threshold']:
                        severity = 'warning'
                        threshold_value = threshold['warning_threshold']
                else:
                    if current_value <= threshold['warning_threshold']:
                        severity = 'warning'
                        threshold_value = threshold['warning_threshold']
            
            if severity:
                message = f"{metric_name.replace('_', ' ').title()}: {current_value:.2f}% (threshold: {threshold_value:.2f}%)"
                alerts.append({
                    'metric_name': metric_name,
                    'current_value': current_value,
                    'threshold_value': threshold_value,
                    'severity': severity,
                    'message': message
                })
                
                # Log alert
                cursor.execute("""
                    INSERT INTO alerts_log (
                        alert_date, metric_name, current_value, 
                        threshold_value, severity, message
                    ) VALUES (?, ?, ?, ?, ?, ?)
                """, (today, metric_name, current_value, threshold_value, severity, message))
        
        self.conn.commit()
        return alerts
    
    def get_warmup_progress(self):
        """Get overall warm-up progress"""
        cursor = self.conn.cursor()
        cursor.execute("""
            SELECT 
                COUNT(*) as total_days,
                SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_days,
                SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress_days,
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_days
            FROM warmup_schedule
        """)
        return cursor.fetchone()
    
    def get_recent_metrics(self, days=7):
        """Get metrics for the last N days"""
        cursor = self.conn.cursor()
        cursor.execute("""
            SELECT * FROM daily_metrics 
            ORDER BY date DESC 
            LIMIT ?
        """, (days,))
        return cursor.fetchall()
    
    def generate_daily_report(self):
        """Generate a daily progress report"""
        today = date.today().isoformat()
        
        # Get today's schedule
        schedule = self.get_today_schedule()
        
        # Get today's metrics
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM daily_metrics WHERE date = ?", (today,))
        metrics = cursor.fetchone()
        
        # Get alerts
        alerts = self.check_kpi_thresholds()
        
        # Get progress
        progress = self.get_warmup_progress()
        
        report = {
            'date': today,
            'schedule': dict(schedule) if schedule else None,
            'metrics': dict(metrics) if metrics else None,
            'alerts': alerts,
            'progress': dict(progress) if progress else None
        }
        
        return report
    
    def print_daily_report(self):
        """Print a formatted daily report"""
        report = self.generate_daily_report()
        
        print("=" * 60)
        print(f"BEACON MOMENTUM WARM-UP REPORT - {report['date']}")
        print("=" * 60)
        
        if report['schedule']:
            print(f"\n📅 TODAY'S SCHEDULE (Day {report['schedule']['day_number']}):")
            print(f"   Target Volume: {report['schedule']['target_volume_min']}-{report['schedule']['target_volume_max']} emails")
            print(f"   Target Audience: {report['schedule']['target_audience']}")
            print(f"   Content Focus: {report['schedule']['content_focus']}")
        
        if report['metrics']:
            print(f"\n📊 TODAY'S METRICS:")
            print(f"   Emails Sent: {report['metrics']['emails_sent']}")
            print(f"   Delivery Rate: {report['metrics']['delivery_rate']:.2f}%")
            print(f"   Bounce Rate: {report['metrics']['bounce_rate']:.2f}%")
            print(f"   Open Rate: {report['metrics']['open_rate']:.2f}%")
            print(f"   Click Rate: {report['metrics']['click_rate']:.2f}%")
            print(f"   Spam Rate: {report['metrics']['spam_rate']:.4f}%")
            print(f"   Status: {report['metrics']['status'].upper()}")
        
        if report['alerts']:
            print(f"\n⚠️  ALERTS ({len(report['alerts'])}):")
            for alert in report['alerts']:
                icon = "🔴" if alert['severity'] == 'critical' else "🟡"
                print(f"   {icon} {alert['message']}")
        else:
            print(f"\n✅ NO ALERTS - All KPIs within thresholds")
        
        if report['progress']:
            print(f"\n📈 OVERALL PROGRESS:")
            print(f"   Total Days: {report['progress']['total_days']}")
            print(f"   Completed: {report['progress']['completed_days']}")
            print(f"   In Progress: {report['progress']['in_progress_days']}")
            print(f"   Pending: {report['progress']['pending_days']}")
            completion = (report['progress']['completed_days'] / report['progress']['total_days']) * 100
            print(f"   Completion: {completion:.1f}%")
        
        print("=" * 60)

def main():
    """Main function for CLI usage"""
    monitor = WarmUpMonitor()
    monitor.connect()
    
    try:
        # Example: Log sample metrics
        sample_metrics = {
            'emails_sent': 75,
            'emails_delivered': 74,
            'emails_bounced': 1,
            'emails_opened': 22,
            'emails_clicked': 5,
            'spam_complaints': 0,
            'unsubscribes': 0
        }
        
        status = monitor.log_daily_metrics(sample_metrics)
        print(f"✅ Metrics logged successfully. Status: {status}")
        
        # Print daily report
        monitor.print_daily_report()
        
    finally:
        monitor.close()

if __name__ == "__main__":
    main()
