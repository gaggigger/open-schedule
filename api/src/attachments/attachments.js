'use strict';

const config = require('../../config');
const Db = require('../database/' + config.database.dirver);


class Attachments {

    set(user, body) {
        return Db.query('set_attachements', {
            roles: user.roles,
            user_id : user.id,
            sessions: 1 // TODO defaut session and selected session
        }, new Buffer(body.split('base64,')[1], 'base64'));
    }

}

module.exports = new Attachments();