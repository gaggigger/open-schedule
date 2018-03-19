'use strict';

const config = require('../../config');
const Db = require('../database/' + config.database.dirver);


class ResourcesFeatures {

    getFeatures(roles, params = {}) {
        return Db.select('get_resources_features', Object.assign(params, {
            roles: roles
        }));
    }

    getFeaturesInfo(roles, resource) {
        return Db.select('get_resources_columns', Object.assign(params, {
            roles: roles
        })).then(rows => {
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

    createItems(roles, params) {
        return Db.query('set_items', Object.assign(params, {
            roles: roles
        })).then(rows => {
            return Object.assign({id : rows.id}, JSON.parse(rows.params));
        });
    }

}

module.exports = new ResourcesFeatures();