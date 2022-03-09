
const fs = require('fs')
const path = require('path')

const dbFile = path.join(__dirname, '../mysqlite.db')

if (!fs.existsSync(dbFile)) {
    fs.writeFile(dbFile, '', (err) => {
        if (err)
            console.log(err);
        else {
            console.log("Database file created successfully!");
        }
    })
}

const sqlite = require('better-sqlite3-with-prebuilds')
const db = new sqlite(dbFile)

db.prepare('CREATE TABLE IF NOT EXISTS test (name TEXT)').run();

// var stmt = db.prepare("INSERT INTO test VALUES (?)");
// for (var i = 0; i < 100; i++) {
//     stmt.run("Ipsum " + i);
// }

exports.db = db