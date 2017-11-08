'use strict';

const Interface = require('../utils/interface');


class IDb extends Interface {
    escape(str) {}
    select(sql, params) {}
}

module.exports = IDb;