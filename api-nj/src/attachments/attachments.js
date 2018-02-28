'use strict';

const config = require('../../config');
const Db = require('../database/' + config.database.dirver);


class Attachments {

    set(user, body, item_id) {
        return Db.query('set_attachements', {
            roles: user.roles,
            user_id : user.id,
            item_id : item_id || null,
            sessions: 1 // TODO defaut session and selected session
        }, new Buffer(body.split('base64,')[1], 'base64'));
    }

    get(user, uuid) {
        return Db.select('get_attachments', {
            roles: user.roles,
            uuid : uuid,
            sessions: 1 // TODO defaut session and selected session
        });
    }

}

module.exports = new Attachments();