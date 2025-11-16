const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'beacon.db');
const db = new sqlite3.Database(dbPath);

console.log('Checking community_posts table schema...\n');

db.all("PRAGMA table_info(community_posts)", [], (err, columns) => {
    if (err) {
        console.error('Error:', err);
        db.close();
        return;
    }

    console.log('community_posts table columns:');
    columns.forEach(col => {
        console.log(`- ${col.name} (${col.type})`);
    });
    
    db.close();
});
