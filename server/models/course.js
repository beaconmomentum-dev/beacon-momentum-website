const db = require('../database/init');

class Course {
    // Get all courses
    static getAllCourses(callback) {
        const sql = 'SELECT * FROM courses ORDER BY created_at DESC';
        db.all(sql, [], callback);
    }

    // Get course by slug with modules and lessons
    static getCourseBySlug(slug, callback) {
        const sql = `
            SELECT c.*, 
                   json_group_array(
                       json_object(
                           'id', m.id,
                           'title', m.title,
                           'module_order', m.module_order
                       )
                   ) as modules
            FROM courses c
            LEFT JOIN modules m ON c.id = m.course_id
            WHERE c.slug = ?
            GROUP BY c.id
        `;
        
        db.get(sql, [slug], (err, course) => {
            if (err) return callback(err);
            if (!course) return callback(null, null);
            
            // Parse modules JSON
            course.modules = JSON.parse(course.modules);
            callback(null, course);
        });
    }

    // Get modules by course ID
    static getModulesByCourseId(courseId, callback) {
        const sql = 'SELECT * FROM modules WHERE course_id = ? ORDER BY module_order';
        db.all(sql, [courseId], callback);
    }

    // Get lessons by module ID
    static getLessonsByModuleId(moduleId, callback) {
        const sql = 'SELECT * FROM lessons WHERE module_id = ? ORDER BY lesson_order';
        db.all(sql, [moduleId], callback);
    }

    // Get single lesson by ID
    static getLessonById(lessonId, callback) {
        const sql = 'SELECT * FROM lessons WHERE id = ?';
        db.get(sql, [lessonId], callback);
    }

    // Create a new course
    static createCourse(data, callback) {
        const sql = `
            INSERT INTO courses (slug, title, description, thumbnail_url, required_tier)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.run(sql, [data.slug, data.title, data.description, data.thumbnail_url, data.required_tier], function(err) {
            callback(err, this ? this.lastID : null);
        });
    }

    // Create a new module
    static createModule(data, callback) {
        const sql = `
            INSERT INTO modules (course_id, title, module_order)
            VALUES (?, ?, ?)
        `;
        db.run(sql, [data.course_id, data.title, data.module_order], function(err) {
            callback(err, this ? this.lastID : null);
        });
    }

    // Create a new lesson
    static createLesson(data, callback) {
        const sql = `
            INSERT INTO lessons (module_id, title, content_type, content_url, content_body, lesson_order)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.run(sql, [
            data.module_id,
            data.title,
            data.content_type,
            data.content_url,
            data.content_body,
            data.lesson_order
        ], function(err) {
            callback(err, this ? this.lastID : null);
        });
    }
}

module.exports = Course;
