'use strict';

const config = require('../../config');
const Db = require('../database/' + config.database.dirver);


class Recources {

    connect(user, pwd) {
        return Db.select('get_user_by_name_password', {
            username: user,
            password: pwd
        }).then(rows => {
            if(!rows || ! rows[0]) throw new Error('Bad credentials');
            console.log(rows[0]);
            return rows[0];
        });
    }

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

    getData(roles, resource) {
        return Db.select('get_resources_data', {
            roles: roles,
            resource: resource
        });
    }

    getFeatures(roles, resource) {
        return Db.select('get_resources_features', {
            roles: roles,
            resource: resource
        });
    }

    getFeaturesInfo(roles, resource) {
        return Db.select('get_resources_columns', {
            roles: roles,
            resource: resource
        }).then(rows => {
            if(! rows[0]) throw new Error('No rows found');
            if(rows[0].columns === null) return [];
            let features = {};
            JSON.parse(rows[0].columns).map(row => {
                if(! features[row.group]) features[row.group] = [];
                features[row.group].push(row);
            });
            return features;
        });
    }

}

module.exports = new Recources();