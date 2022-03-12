const { ipcRenderer } = require('electron');

import TestModel from '../models/TestModel'

let test = new TestModel()
const getNames = (dbFile) => {
    test.init(dbFile)
    return test.getNames()
}

const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel) => {
        // whitelist channels
        let validChannels = [
            'minimizeWindow',
            'maximizeWindow',
            'restoreWindow',
            'closeApplication',
        ]
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel)
        }
    },
    // receive: (channel, func) => {
    //     let validChannels = ['fromMain']
    //     if (validChannels.includes(channel)) {
    //         // Deliberately strip event as it includes `sender`
    //         ipcRenderer.on(channel, (event, ...args) => func(...args))
    //     }
    // }
})

contextBridge.exposeInMainWorld('api', {
    loadDatabase: () => ipcRenderer.invoke('check-db-exists'),
    getNames: getNames,
})

