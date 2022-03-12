'use strict'

import DbMgr from './DmMgr'

export default class TestModel extends DbMgr {
    getNames() {
        console.log('here', this.dbFile)
        const sql = 'SELECT * FROM test'
        let stmt = this.db.prepare(sql)
        let res = stmt.all()
        return res
    }
}
