const { ipcRenderer } = require('electron');

import TestModel from '../models/TestModel'

let test = new TestModel()
const getNames = (dbFile) => {
    test.init(dbFile)
    return test.getNames()
}

const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('api', {
    loadDatabase: () => ipcRenderer.invoke('check-db-exists'),
    // initDb: initDb,
    getNames: getNames
})

