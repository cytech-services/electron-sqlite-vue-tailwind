const testmgr = require('../models/testmgr')
const { contextBridge } = require('electron')

const getNames = () => {
    return testmgr.getNames()
}

contextBridge.exposeInMainWorld('api', {
    getNames: getNames
})