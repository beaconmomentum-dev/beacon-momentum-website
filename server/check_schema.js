const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'beacon.db');
const db = new sqlite3.Database(dbPath);

console.log('Checking modules table schema...\n');

db.all("PRAGMA table_info(modules)", [], (err, columns) => {
    if (err) {
        console.error('Error:', err);
        db.close();
        return;
    }

    console.log('Modules table columns:');
    columns.forEach(col => {
        console.log(`- ${col.name} (${col.type})`);
    });

    // Check if order_index exists
    const hasOrderIndex = columns.some(col => col.name === 'order_index');
    
    if (!hasOrderIndex) {
        console.log('\n⚠️ order_index column missing! Adding it now...');
        
        db.run("ALTER TABLE modules ADD COLUMN order_index INTEGER DEFAULT 1", (err) => {
            if (err) {
                console.error('Error adding column:', err);
            } else {
                console.log('✅ order_index column added successfully');
            }
            db.close();
        });
    } else {
        console.log('\n✅ order_index column exists');
        db.close();
    }
});
