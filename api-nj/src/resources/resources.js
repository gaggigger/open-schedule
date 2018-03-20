'use strict';

const config = require('../../config');
const Db = require('../database/' + config.database.dirver);


class Recources {

    getAll(roles, params = {}) {
        return Db.select('get_resources', Object.assign(params, {
            roles: roles
        }));
    }

    getGridColumns(roles, params = {}) {
        return Db.select('get_resources_columns', Object.assign(params, {
            roles: roles
        })).then(rows => {
            if(! rows[0]) throw new Error('No rows found');
            if(rows[0].columns === null) return [];
            return JSON.parse(rows[0].columns);
        });
    }

    getData(roles, params) {
        if(params.children) {
            return Db.select('get_resources_from_params', Object.assign(params, {
                roles: roles
            }));
        }
        else {
            return Db.select('get_resources_data', Object.assign(params, {
                roles: roles
            }));
        }
    }

    deleteData(roles, params) {
        return Db.select('delete_resources_data', Object.assign(params, {
            roles: roles
        }));
    }

    getLnk(roles, params) {
        return Db.select('get_resources_lnk', Object.assign(params, {
            roles: roles
        }));
    }

    setLnk(roles, params) {
        return Db.select('set_resources_lnk', Object.assign(params, {
            roles: roles
        }));
    }

    getSessions(roles, params = {}) {
        return Db.select('get_sessions', {
            roles: roles,
            params: Object.assign({}, params)
        });
    }

    addSessions(roles, data) {
        return Db.query('set_sessions', {
            roles: roles,
            data: Object.assign({}, data)
        });
    }

    deleteSessions(roles, id) {
        return Db.query('delete_sessions', {
            roles: roles,
            id: id
        });
    }
}

module.exports = new Recources();