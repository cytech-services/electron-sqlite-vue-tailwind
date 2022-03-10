const { ipcRenderer } = require('electron');

let dbmgr = require('./dbmgr')
let db

const data = ipcRenderer.invoke('check-db-exists', 'mysqlite.db').then((result) => {
    dbmgr.setUserDataPath(result)
    dbmgr.init()

    db = dbmgr.db

    console.log('data', data)
    userDataPath = data

    console.log('userDataPath', userDataPath)
})


exports.getNames = () => {
    const sql = 'SELECT * FROM test'
    let stmt = db.prepare(sql)
    let res = stmt.all()
    return res
}