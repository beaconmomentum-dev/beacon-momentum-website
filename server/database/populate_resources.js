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

// Resource data
const resources = [
    {
        title: 'Foundation Guide',
        description: 'Core transformation principles to help you rebuild your life from the ground up.',
        file_url: '/content/resources/foundation-guide.pdf',
        thumbnail_url: '/content/images/community/founding_members_icon.png',
        required_tier: 'core'
    },
    {
        title: 'Phoenix Moments Workbook',
        description: 'Personal transformation exercises to help you rise from your ashes.',
        file_url: '/content/resources/phoenix-moments-workbook.pdf',
        thumbnail_url: '/content/images/community/transformation_background.png',
        required_tier: 'core'
    },
    {
        title: 'Next Chapter Guide',
        description: 'Life rebuilding framework for creating your new beginning.',
        file_url: '/content/resources/next-chapter-guide.pdf',
        thumbnail_url: '/content/images/community/success_path_icon.png',
        required_tier: 'community'
    },
    {
        title: 'Little Things Guide',
        description: 'Daily practices and small habits that create lasting transformation.',
        file_url: '/content/resources/little-things-guide.pdf',
        thumbnail_url: '/content/images/community/welcome_orientation_icon.png',
        required_tier: 'community'
    },
    {
        title: 'Solopreneur Launchpad',
        description: 'Business starting guide for building your own path forward.',
        file_url: '/content/resources/solopreneur-launchpad.pdf',
        thumbnail_url: '/content/images/community/rv_journey_icon.png',
        required_tier: 'community'
    },
    {
        title: 'Strategic Rest Protocol',
        description: 'Recovery and sustainability practices for long-term success.',
        file_url: '/content/resources/strategic-rest-protocol.pdf',
        thumbnail_url: '/content/images/community/campfire_background.png',
        required_tier: 'founding_member'
    }
];

console.log('\nPopulating resources table...\n');

db.serialize(() => {
    const stmt = db.prepare(`
        INSERT INTO resources (title, description, file_url, thumbnail_url, required_tier)
        VALUES (?, ?, ?, ?, ?)
    `);

    resources.forEach((resource, index) => {
        stmt.run(
            resource.title,
            resource.description,
            resource.file_url,
            resource.thumbnail_url,
            resource.required_tier,
            function(err) {
                if (err) {
                    console.error(`❌ Error inserting ${resource.title}:`, err.message);
                } else {
                    console.log(`✓ Added: ${resource.title} (Tier: ${resource.required_tier})`);
                }
            }
        );
    });

    stmt.finalize();
});

db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('\n✅ Resources populated successfully!');
    }
});
