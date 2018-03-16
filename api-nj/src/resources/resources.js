'use strict';

const config = require('../../config');
const Db = require('../database/' + config.database.dirver);


class Recources {

    getAll(roles) {
        return Db.select('get_resources', {
            roles: roles
        });
    }

    getGridColumns(roles, resource) {
        return Db.select('get_resources_columns', {
            roles: roles,
            resource: resource
        }).then(rows => {
            if(! rows[0]) throw new Error('No rows found');
            if(rows[0].columns === null) return [];
            return JSON.parse(rows[0].columns);
        });
    }

    getData(roles, params) {
        if(params.children) {
            return Db.select('get_resources_from_params', Object.assign({
                roles: roles
            }, params));
        }
        else {
            return Db.select('get_resources_data', Object.assign({
                roles: roles
            }, params));
        }
    }

    getLnk(roles, params) {
        return Db.select('get_resources_lnk', Object.assign({
            roles: roles
        }, params));
    }

    setLnk(roles, params) {
        return Db.select('set_resources_lnk', Object.assign({
            roles: roles,
            sessions: 1
        }, params));
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