const path = require('path')
const sqlite = require('better-sqlite3')

let userDataPath, dbFile, db

exports.init = () => {
    console.log(path.join(userDataPath, 'mysqlite.db'))
    dbFile = path.join(userDataPath, 'mysqlite.db')
    db = new sqlite(dbFile)

    db.prepare('CREATE TABLE IF NOT EXISTS test (name TEXT)').run();

    var stmt = db.prepare("INSERT INTO test VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }

    exports.db = db
}

exports.setUserDataPath = (result) => {
    console.log(result)
    userDataPath = result
    exports.userDataPath = userDataPath
}

