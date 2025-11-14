const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        // Configure email transporter
        // Using environment variables for email credentials
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    async sendVerificationEmail(email, token, firstName) {
        const verificationUrl = `${process.env.BASE_URL || 'https://beaconmomentum.com'}/verify-email.html?token=${token}`;
        
        const mailOptions = {
            from: `"Beacon Momentum" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Verify Your Beacon Momentum Account',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #1a472a 0%, #2d5f3f 100%); color: white; padding: 30px; text-align: center; }
                        .content { background: #f9f9f9; padding: 30px; }
                        .button { display: inline-block; background: #D4AF37; color: #1a1a1a; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
                        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🚀 Welcome to Beacon Momentum!</h1>
                        </div>
                        <div class="content">
                            <p>Hi ${firstName},</p>
                            <p>Thank you for joining Beacon Momentum! We're excited to have you on this journey toward financial sovereignty.</p>
                            <p>To complete your registration and access the Beacon Capital Suite, please verify your email address by clicking the button below:</p>
                            <p style="text-align: center;">
                                <a href="${verificationUrl}" class="button">Verify My Email</a>
                            </p>
                            <p>Or copy and paste this link into your browser:</p>
                            <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
                            <p><strong>This link will expire in 24 hours.</strong></p>
                            <p>If you didn't create an account with Beacon Momentum, please ignore this email.</p>
                            <p>Welcome aboard!<br>The Beacon Momentum Team</p>
                        </div>
                        <div class="footer">
                            <p>&copy; 2025 Beacon Momentum. All rights reserved.</p>
                            <p>Lighting the Way Forward</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            return { success: true };
        } catch (error) {
            console.error('Email sending error:', error);
            return { success: false, error: error.message };
        }
    }

    async sendPasswordResetEmail(email, token, firstName) {
        const resetUrl = `${process.env.BASE_URL || 'https://beaconmomentum.com'}/reset-password.html?token=${token}`;
        
        const mailOptions = {
            from: `"Beacon Momentum" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Reset Your Beacon Momentum Password',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #8B1538 0%, #a31d47 100%); color: white; padding: 30px; text-align: center; }
                        .content { background: #f9f9f9; padding: 30px; }
                        .button { display: inline-block; background: #D4AF37; color: #1a1a1a; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
                        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                        .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🔐 Password Reset Request</h1>
                        </div>
                        <div class="content">
                            <p>Hi ${firstName},</p>
                            <p>We received a request to reset your Beacon Momentum password.</p>
                            <p>Click the button below to create a new password:</p>
                            <p style="text-align: center;">
                                <a href="${resetUrl}" class="button">Reset My Password</a>
                            </p>
                            <p>Or copy and paste this link into your browser:</p>
                            <p style="word-break: break-all; color: #666;">${resetUrl}</p>
                            <p><strong>This link will expire in 1 hour.</strong></p>
                            <div class="warning">
                                <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
                            </div>
                            <p>Stay secure!<br>The Beacon Momentum Team</p>
                        </div>
                        <div class="footer">
                            <p>&copy; 2025 Beacon Momentum. All rights reserved.</p>
                            <p>Lighting the Way Forward</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            return { success: true };
        } catch (error) {
            console.error('Email sending error:', error);
            return { success: false, error: error.message };
        }
    }

    async sendWelcomeEmail(email, firstName) {
        const dashboardUrl = `${process.env.BASE_URL || 'https://beaconmomentum.com'}/member-dashboard.html`;
        
        const mailOptions = {
            from: `"Beacon Momentum" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Welcome to Beacon Capital Suite!',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #1a472a 0%, #2d5f3f 100%); color: white; padding: 30px; text-align: center; }
                        .content { background: #f9f9f9; padding: 30px; }
                        .button { display: inline-block; background: #D4AF37; color: #1a1a1a; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
                        .module { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #D4AF37; }
                        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🎉 Your Account is Verified!</h1>
                        </div>
                        <div class="content">
                            <p>Hi ${firstName},</p>
                            <p>Congratulations! Your email has been verified and you now have full access to the Beacon Capital Suite.</p>
                            <h3>📚 Your Learning Journey Begins:</h3>
                            <div class="module">
                                <strong>Module 1:</strong> DeFi Investment Banking Foundations
                            </div>
                            <div class="module">
                                <strong>Module 2:</strong> Liquidity Engineering Basics
                            </div>
                            <div class="module">
                                <strong>Module 3:</strong> Multi-Wallet Structures & Capital Protection
                            </div>
                            <div class="module">
                                <strong>Module 4:</strong> Beacon Internal Capital Flows Overview
                            </div>
                            <div class="module">
                                <strong>Module 5:</strong> Safe Navigation Protocols
                            </div>
                            <p style="text-align: center;">
                                <a href="${dashboardUrl}" class="button">Access Your Dashboard</a>
                            </p>
                            <p><strong>Remember:</strong> This is educational content only. Always do your own research and never invest more than you can afford to lose.</p>
                            <p>Let's build your financial sovereignty together!</p>
                            <p>The Beacon Momentum Team</p>
                        </div>
                        <div class="footer">
                            <p>&copy; 2025 Beacon Momentum. All rights reserved.</p>
                            <p>Lighting the Way Forward</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            return { success: true };
        } catch (error) {
            console.error('Email sending error:', error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = new EmailService();
