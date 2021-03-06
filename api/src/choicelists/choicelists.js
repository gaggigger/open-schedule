'use strict';

const config = require('../../config');
const Db = require('../database/' + config.database.dirver);


class Choicelists {

    get(user, uuid) {
        return Db.select('get_choicelists', {
            roles: user.roles,
            sessions: 1 // TODO defaut session and selected session
        }).then(rows => {
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