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
            return JSON.parse(rows[0].columns).filter(row => row.grid_column).map(row => {
                return {
                    field: row.name,
                    width: row.length? row.length * 8 : null,
                    headerName: row.label
                };
            });
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

    getSessions(roles) {
        return Db.select('get_sessions', {
            roles: roles
        });
    }

    addSessions(roles, data) {
        return Db.query('set_sessions', {
            roles: roles,
            data: Object.assign({
                closed: 0
            }, data)
        });
    }

    closeSessions(roles, data) {
        return Db.query('set_sessions', {
            roles: roles,
            data: Object.assign({
                closed: 0
            }, data)
        });
    }

}

module.exports = new Recources();