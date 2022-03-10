const testmgr = require('../models/testmgr')
const getNames = () => {
    return testmgr.getNames()
}

const { contextBridge } = require('electron')
contextBridge.exposeInMainWorld('api', {
    getNames: getNames
})