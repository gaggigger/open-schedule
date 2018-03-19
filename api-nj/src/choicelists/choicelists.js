'use strict';

const config = require('../../config');
const Db = require('../database/' + config.database.dirver);


class Choicelists {

    get(roles, params) {
        return Db.select('get_choicelists', Object.assign(params, {
            roles: roles
        })).then(rows => {
            return rows.map(row => {
                return {
                    name : row.name,
                    items : JSON.parse(row.params)
                };
            })
        });
    }

}

module.exports = new Choicelists();