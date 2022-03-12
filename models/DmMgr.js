'use strict'

const fs = require('fs')

export default class DmMgr {
    init(dbFile) {
        this.dbFile = dbFile

        this.firstRun = false
        try {
            fs.statSync(this.dbFile);
            console.log("Database file exists!");
        } catch (error) {
            this.firstRun = true
            fs.writeFileSync(this.dbFile, '', (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Database file created successfully!");
                }
            })
        }

        const sqlite = require('better-sqlite3')
        this.db = new sqlite(this.dbFile)

        if (this.firstRun) {
            this.db.prepare('CREATE TABLE IF NOT EXISTS test (name TEXT)').run();

            var stmt = this.db.prepare("INSERT INTO test VALUES (?)");
            for (var i = 0; i < 100; i++) {
                console.log(i)
                stmt.run("Ipsum " + i);
            }
        }
    }
}
