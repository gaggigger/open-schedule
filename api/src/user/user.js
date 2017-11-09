'use strict';

const config = require('../../config');
const Db = require('../database/' + config.database.dirver);


class User {

    connect(user, pwd) {
        return Db.select('get_user_by_name_password', {
            username: user,
            password: pwd
        }).then(rows => {
            if(!rows || ! rows[0]) throw new Error('Bad credentials');
            if(rows[0].attributes) rows[0].attributes = JSON.parse(rows[0].attributes);
            if(rows[0].roles) rows[0].roles = JSON.parse(rows[0].roles);
            return rows[0];
        });
    }

}

module.exports = new User();