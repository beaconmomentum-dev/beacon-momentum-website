const db = require('../database/init');

class Event {
    // Get all upcoming events
    static getUpcomingEvents(callback) {
        const sql = `
            SELECT * FROM events 
            WHERE event_datetime >= datetime('now')
            ORDER BY event_datetime ASC
        `;
        db.all(sql, [], callback);
    }

    // Get all past events
    static getPastEvents(callback) {
        const sql = `
            SELECT * FROM events 
            WHERE event_datetime < datetime('now')
            ORDER BY event_datetime DESC
        `;
        db.all(sql, [], callback);
    }

    // Get event by ID
    static getEventById(eventId, callback) {
        const sql = 'SELECT * FROM events WHERE id = ?';
        db.get(sql, [eventId], callback);
    }

    // Register user for event
    static registerUserForEvent(userId, eventId, callback) {
        // First check if already registered
        const checkSql = 'SELECT id FROM event_registrations WHERE user_id = ? AND event_id = ?';
        
        db.get(checkSql, [userId, eventId], (err, existing) => {
            if (err) return callback(err);
            if (existing) return callback(new Error('Already registered for this event'));
            
            // Register the user
            const insertSql = `
                INSERT INTO event_registrations (user_id, event_id)
                VALUES (?, ?)
            `;
            db.run(insertSql, [userId, eventId], function(err) {
                callback(err, this ? this.lastID : null);
            });
        });
    }

    // Unregister user from event
    static unregisterUserFromEvent(userId, eventId, callback) {
        const sql = 'DELETE FROM event_registrations WHERE user_id = ? AND event_id = ?';
        db.run(sql, [userId, eventId], callback);
    }

    // Get user's registered events
    static getUserRegistrations(userId, callback) {
        const sql = `
            SELECT e.*, er.registered_at
            FROM events e
            JOIN event_registrations er ON e.id = er.event_id
            WHERE er.user_id = ?
            ORDER BY e.event_datetime ASC
        `;
        db.all(sql, [userId], callback);
    }

    // Get registrations for an event (with user info)
    static getEventRegistrations(eventId, callback) {
        const sql = `
            SELECT u.id, u.name, u.email, er.registered_at
            FROM users u
            JOIN event_registrations er ON u.id = er.user_id
            WHERE er.event_id = ?
            ORDER BY er.registered_at ASC
        `;
        db.all(sql, [eventId], callback);
    }

    // Create a new event (admin only)
    static createEvent(data, callback) {
        const sql = `
            INSERT INTO events (title, description, event_datetime, duration_minutes, meeting_url, required_tier)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.run(sql, [
            data.title,
            data.description,
            data.event_datetime,
            data.duration_minutes,
            data.meeting_url,
            data.required_tier
        ], function(err) {
            callback(err, this ? this.lastID : null);
        });
    }

    // Update event recording URL (admin only)
    static updateRecordingUrl(eventId, recordingUrl, callback) {
        const sql = 'UPDATE events SET recording_url = ? WHERE id = ?';
        db.run(sql, [recordingUrl, eventId], callback);
    }

    // Delete an event (admin only)
    static deleteEvent(eventId, callback) {
        const sql = 'DELETE FROM events WHERE id = ?';
        db.run(sql, [eventId], callback);
    }

    // Check if user is registered for event
    static isUserRegistered(userId, eventId, callback) {
        const sql = 'SELECT id FROM event_registrations WHERE user_id = ? AND event_id = ?';
        db.get(sql, [userId, eventId], (err, row) => {
            callback(err, !!row);
        });
    }
}

module.exports = Event;
