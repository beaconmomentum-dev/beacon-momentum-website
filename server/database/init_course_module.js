const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database path
const dbPath = path.join(__dirname, 'beacon.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        process.exit(1);
    }
    console.log('Connected to beacon.db');
});

// Run migrations
db.serialize(() => {
    console.log('Starting database migration for course module...\n');

    // 1. Courses table
    db.run(`
        CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            thumbnail_url TEXT,
            required_tier TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating courses table:', err.message);
        } else {
            console.log('✓ Created courses table');
        }
    });

    // 2. Modules table
    db.run(`
        CREATE TABLE IF NOT EXISTS modules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            course_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            module_order INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error('Error creating modules table:', err.message);
        } else {
            console.log('✓ Created modules table');
        }
    });

    // 3. Lessons table
    db.run(`
        CREATE TABLE IF NOT EXISTS lessons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            module_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            content_type TEXT NOT NULL,
            content_url TEXT,
            content_body TEXT,
            lesson_order INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error('Error creating lessons table:', err.message);
        } else {
            console.log('✓ Created lessons table');
        }
    });

    // 4. Community spaces table
    db.run(`
        CREATE TABLE IF NOT EXISTS community_spaces (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            required_tier TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating community_spaces table:', err.message);
        } else {
            console.log('✓ Created community_spaces table');
        }
    });

    // 5. Community posts table
    db.run(`
        CREATE TABLE IF NOT EXISTS community_posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            space_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            is_pinned BOOLEAN DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (space_id) REFERENCES community_spaces(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error('Error creating community_posts table:', err.message);
        } else {
            console.log('✓ Created community_posts table');
        }
    });

    // 6. Community comments table
    db.run(`
        CREATE TABLE IF NOT EXISTS community_comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            post_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            parent_comment_id INTEGER,
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (parent_comment_id) REFERENCES community_comments(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error('Error creating community_comments table:', err.message);
        } else {
            console.log('✓ Created community_comments table');
        }
    });

    // 7. Events table
    db.run(`
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            event_datetime DATETIME NOT NULL,
            duration_minutes INTEGER,
            meeting_url TEXT,
            recording_url TEXT,
            required_tier TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating events table:', err.message);
        } else {
            console.log('✓ Created events table');
        }
    });

    // 8. Event registrations table
    db.run(`
        CREATE TABLE IF NOT EXISTS event_registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(event_id, user_id),
            FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error('Error creating event_registrations table:', err.message);
        } else {
            console.log('✓ Created event_registrations table');
        }
    });

    // 9. User progress table
    db.run(`
        CREATE TABLE IF NOT EXISTS user_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            lesson_id INTEGER NOT NULL,
            completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_id, lesson_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error('Error creating user_progress table:', err.message);
        } else {
            console.log('✓ Created user_progress table');
        }
    });

    // 10. Resources table
    db.run(`
        CREATE TABLE IF NOT EXISTS resources (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            file_url TEXT NOT NULL,
            thumbnail_url TEXT,
            required_tier TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating resources table:', err.message);
        } else {
            console.log('✓ Created resources table');
        }
    });

    // 11. Update users table to add membership_tier and last_active
    db.run(`
        ALTER TABLE users ADD COLUMN membership_tier TEXT DEFAULT 'core'
    `, (err) => {
        if (err && !err.message.includes('duplicate column')) {
            console.error('Error adding membership_tier to users:', err.message);
        } else if (!err) {
            console.log('✓ Added membership_tier column to users table');
        }
    });

    db.run(`
        ALTER TABLE users ADD COLUMN last_active DATETIME
    `, (err) => {
        if (err && !err.message.includes('duplicate column')) {
            console.error('Error adding last_active to users:', err.message);
        } else if (!err) {
            console.log('✓ Added last_active column to users table');
        }
    });

    // Create indexes for performance
    console.log('\nCreating indexes...');
    
    db.run('CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug)');
    db.run('CREATE INDEX IF NOT EXISTS idx_modules_course_id ON modules(course_id)');
    db.run('CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON lessons(module_id)');
    db.run('CREATE INDEX IF NOT EXISTS idx_community_posts_space_id ON community_posts(space_id)');
    db.run('CREATE INDEX IF NOT EXISTS idx_community_comments_post_id ON community_comments(post_id)');
    db.run('CREATE INDEX IF NOT EXISTS idx_event_registrations_user_id ON event_registrations(user_id)');
    db.run('CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id)', (err) => {
        if (err) {
            console.error('Error creating indexes:', err.message);
        } else {
            console.log('✓ Created performance indexes');
        }
    });
});

// Close database connection
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('\n✅ Database migration completed successfully!');
        console.log('Database version: 2.0 (Course Module)');
    }
});
