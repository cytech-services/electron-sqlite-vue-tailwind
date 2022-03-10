

document.addEventListener('DOMContentLoaded', async () => {
    let names = window.api.getNames()
    console.log(names)

    let divNames = document.getElementById('names')
    let namesArray = []
    names.forEach(name => {
        namesArray.push(name.name)
    });
    let nameString = namesArray.join('<br />')
    divNames.innerHTML = nameString

})


// const path = require('path')
// const fs = require('fs')
// const sqlite3 = require('sqlite3').verbose();
// // const db = new sqlite3.Database(':memory:');
// window.model.db = path.join(app.getPath('userData'), 'example.db')

// window.model.test()

// sqlite3.dbOpen = function (databaseFileName) {
//     try {
//         return new sqlite3.Database(fs.readFileSync(databaseFileName))
//     } catch (error) {
//         console.log("Can't open database file.", error.message)
//         return null
//     }
// }

// sqlite3.dbClose = function (databaseHandle, databaseFileName) {
//     try {
//         let data = databaseHandle.export()
//         let buffer = Buffer.alloc(data.length, data)
//         fs.writeFileSync(databaseFileName, buffer)
//         databaseHandle.close()
//         return true
//     } catch (error) {
//         console.log("Can't close database file.", error)
//         return null
//     }
// }

// let _rowsFromSqlDataObject = function (object) {
//     let data = {}
//     let i = 0
//     let j = 0
//     for (let valueArray of object.values) {
//         data[i] = {}
//         j = 0
//         for (let column of object.columns) {
//             Object.assign(data[i], { [column]: valueArray[j] })
//             j++
//         }
//         i++
//     }
//     return data
// }

// db.serialize(function () {
//     db.run("CREATE TABLE lorem (info TEXT)");

//     var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//     for (var i = 0; i < 10; i++) {
//         stmt.run("Ipsum " + i);
//     }
//     stmt.finalize();

//     db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
//         console.log(row.id + ": " + row.info);
//     });
// });

// // db.close();

// /*
//   Populates the People List.
// */
// module.exports.test = function () {
//     console.log('here')
//     let db = sqlite3.dbOpen(window.model.db)
//     if (db !== null) {
//         try {
//             db.run("CREATE TABLE lorem (info TEXT)");

//             var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//             for (var i = 0; i < 10; i++) {
//                 stmt.run("Ipsum " + i);
//             }
//             stmt.finalize();

//             db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
//                 console.log(row.id + ": " + row.info);
//             });
//         } catch (error) {
//             console.log('model.test', error.message)
//         } finally {
//             sqlite3.dbClose(db, window.model.db)
//         }
//     }
// }
