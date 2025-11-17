const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Read the members.json file
const membersData = JSON.parse(fs.readFileSync('/tmp/members.json', 'utf8'));

// Database path
const dbPath = path.join(__dirname, 'beacon.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        process.exit(1);
    }
    console.log('Connected to beacon.db');
});

// Mapping old levels to new tiers
const tierMapping = {
    'founding': 'founding_member',
    'member': 'core',
    'community': 'community',
    'admin': 'founding_member' // Admins get founding_member access
};

let migratedCount = 0;
let skippedCount = 0;
let errorCount = 0;

console.log(`\nStarting user migration...`);
console.log(`Total users to process: ${membersData.length}\n`);

// Process each user
db.serialize(() => {
    const stmt = db.prepare(`
        UPDATE users 
        SET membership_tier = ?, 
            last_active = ?
        WHERE email = ?
    `);

    membersData.forEach((member, index) => {
        const newTier = tierMapping[member.level] || 'core';
        const lastActive = member.created; // Use created date as initial last_active

        // Check if user exists first
        db.get('SELECT id, email FROM users WHERE email = ?', [member.email], (err, row) => {
            if (err) {
                console.error(`❌ Error checking user ${member.email}:`, err.message);
                errorCount++;
                return;
            }

            if (row) {
                // User exists, update their tier
                stmt.run(newTier, lastActive, member.email, function(err) {
                    if (err) {
                        console.error(`❌ Error updating ${member.email}:`, err.message);
                        errorCount++;
                    } else {
                        console.log(`✓ Updated ${member.name} (${member.email}) - Tier: ${newTier}`);
                        migratedCount++;
                    }
                });
            } else {
                console.log(`⊘ Skipped ${member.name} (${member.email}) - Not found in Beacon 3.1`);
                skippedCount++;
            }
        });
    });

    // Finalize and close
    setTimeout(() => {
        stmt.finalize();
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log(`\n✅ User migration completed!`);
                console.log(`   Migrated: ${migratedCount}`);
                console.log(`   Skipped: ${skippedCount}`);
                console.log(`   Errors: ${errorCount}`);
            }
        });
    }, 2000); // Wait for all async operations
});
