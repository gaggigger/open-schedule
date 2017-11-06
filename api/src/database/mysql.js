'use strict';

var mysql = require('mysql');
const config = require('../../config');


function handle_database(sql) {
    pool.getConnection(function(err,connection){
        if (err) {
            // TODO
            //res.json({"code" : 100, "status" : "Error in connection database"});
            //return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query(sql,function(err,rows){
            connection.release();
            if(err) {
                // TODO ??
            }
        });

        connection.on('error', function(err) {
            // TODO
            //res.json({"code" : 100, "status" : "Error in connection database"});
            //return;
        });
    });
}

class Mysql {
    //this.pool = null;

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

    select(sql, params) {
        if(typeof params === 'undefined') params = {};
        // TODO params
        return new Promise((resolve, reject) => {
            this.pool.query('CALL os_' + sql + '(\''+ JSON.stringify(params) +'\')', function(err, rows, fields) {
                if (err) reject(err.message);
                // TODO OkPacket in results ?
                resolve(rows[0]);
            });
        });

    }


}

module.exports = new Mysql();