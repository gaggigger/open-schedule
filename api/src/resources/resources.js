'use strict';

const Db = require('../database/mysql');


class Recources {

    constructor() {

    }

    getAll() {
        return new Promise((resolve, reject) => {
            Db.select('get_resources').then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }


}

module.exports = new Recources();