const db = require('../database/init');

class Progress {
    // Mark lesson as complete for user
    static markLessonComplete(userId, lessonId, callback) {
        // Check if already completed
        const checkSql = 'SELECT id FROM user_progress WHERE user_id = ? AND lesson_id = ?';
        
        db.get(checkSql, [userId, lessonId], (err, existing) => {
            if (err) return callback(err);
            if (existing) return callback(null, existing.id); // Already completed
            
            // Mark as complete
            const insertSql = `
                INSERT INTO user_progress (user_id, lesson_id)
                VALUES (?, ?)
            `;
            db.run(insertSql, [userId, lessonId], function(err) {
                callback(err, this ? this.lastID : null);
            });
        });
    }

    // Get user's overall progress
    static getUserProgress(userId, callback) {
        const sql = `
            SELECT 
                c.id as course_id,
                c.title as course_title,
                c.slug as course_slug,
                COUNT(DISTINCT l.id) as total_lessons,
                COUNT(DISTINCT up.lesson_id) as completed_lessons,
                ROUND(CAST(COUNT(DISTINCT up.lesson_id) AS FLOAT) / COUNT(DISTINCT l.id) * 100, 1) as completion_percentage
            FROM courses c
            JOIN modules m ON c.id = m.course_id
            JOIN lessons l ON m.id = l.module_id
            LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ?
            GROUP BY c.id
            ORDER BY c.created_at DESC
        `;
        db.all(sql, [userId], callback);
    }

    // Get course completion percentage
    static getCourseCompletionPercentage(userId, courseId, callback) {
        const sql = `
            SELECT 
                COUNT(DISTINCT l.id) as total_lessons,
                COUNT(DISTINCT up.lesson_id) as completed_lessons,
                ROUND(CAST(COUNT(DISTINCT up.lesson_id) AS FLOAT) / COUNT(DISTINCT l.id) * 100, 1) as completion_percentage
            FROM courses c
            JOIN modules m ON c.id = m.course_id
            JOIN lessons l ON m.id = l.module_id
            LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ?
            WHERE c.id = ?
        `;
        db.get(sql, [userId, courseId], callback);
    }

    // Get completed lessons for a user
    static getCompletedLessons(userId, callback) {
        const sql = `
            SELECT l.*, up.completed_at, m.title as module_title, c.title as course_title
            FROM user_progress up
            JOIN lessons l ON up.lesson_id = l.id
            JOIN modules m ON l.module_id = m.id
            JOIN courses c ON m.course_id = c.id
            WHERE up.user_id = ?
            ORDER BY up.completed_at DESC
        `;
        db.all(sql, [userId], callback);
    }

    // Check if user has completed a specific lesson
    static isLessonCompleted(userId, lessonId, callback) {
        const sql = 'SELECT id FROM user_progress WHERE user_id = ? AND lesson_id = ?';
        db.get(sql, [userId, lessonId], (err, row) => {
            callback(err, !!row);
        });
    }

    // Get module completion status
    static getModuleProgress(userId, moduleId, callback) {
        const sql = `
            SELECT 
                COUNT(l.id) as total_lessons,
                COUNT(up.lesson_id) as completed_lessons,
                ROUND(CAST(COUNT(up.lesson_id) AS FLOAT) / COUNT(l.id) * 100, 1) as completion_percentage
            FROM lessons l
            LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ?
            WHERE l.module_id = ?
        `;
        db.get(sql, [userId, moduleId], callback);
    }

    // Reset progress for a course (admin or user request)
    static resetCourseProgress(userId, courseId, callback) {
        const sql = `
            DELETE FROM user_progress 
            WHERE user_id = ? 
            AND lesson_id IN (
                SELECT l.id FROM lessons l
                JOIN modules m ON l.module_id = m.id
                WHERE m.course_id = ?
            )
        `;
        db.run(sql, [userId, courseId], callback);
    }
}

module.exports = Progress;
