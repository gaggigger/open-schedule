'use strict';

const config = require('../../config');
const Db = require('../database/' + config.database.dirver);


class ResourcesFeatures {

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

    createItems(roles, resource, data) {
        return Db.query('set_items', {
            roles: roles,
            resource: resource,
            data: data
        }).then(rows => {
            return Object.assign({id : rows.id}, JSON.parse(rows.params));
        });
    }

}

module.exports = new ResourcesFeatures();