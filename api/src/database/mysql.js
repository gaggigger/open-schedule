'use strict';

const mysql = require('mysql');
const config = require('../../config');


class Mysql {

    constructor() {
        this.pool = mysql.createPool({
            connectionLimit : 100,
            host     : config.database.host,
            user     : config.database.user,
            password : config.database.password,
            database : config.database.database,
            debug    :  false
        });
    }

    escape(str) {
        return mysql.escape(str);
    }

    select(sql, params) {
        if(typeof params === 'undefined') params = {};
        // TODO params
        return new Promise((resolve, reject) => {
            let query = 'CALL os_' + sql + '(\''+ JSON.stringify(params) +'\')';
            this.pool.query(query, function(err, rows, fields) {
                if (err) {
                    reject(err.message);
                    return false;
                }
                // TODO OkPacket in results ?
                if(typeof rows !== 'undefined' && 0 in rows) resolve(rows[0]);
                else reject(rows);
            });
        });

    }


}

module.exports = new Mysql();