'use strict';

const config = require('../../config');
const Db = require('../database/' + config.database.dirver);


class Modules {
    getItems(roles, params) {
        return Db.select('get_modules_data', Object.assign(params, {
            roles: roles
        })).then(rows => {
            return rows;
        });
    }

    createItems(roles, params) {
        return Db.query('set_modules_data', Object.assign(params, {
            roles: roles
        })).then(rows => {
            return rows;
        });
    }

}

module.exports = new Modules();