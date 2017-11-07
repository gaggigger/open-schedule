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

    getGridColumns(roles, resource) {
        return Db.select('get_resources_grid_columns', {
            roles: roles,
            resource: resource
        });
    }

    getData(roles, resource) {
        return Db.select('get_resources_data', {
            roles: roles,
            resource: resource
        });
    }


}

module.exports = new Recources();