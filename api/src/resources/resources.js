'use strict';

const Db = require('../database/mysql');


class Recources {

    constructor() {

    }

    getAll(roles) {
        return Db.select('get_resources', {
            roles: roles
        });
    }


}

module.exports = new Recources();