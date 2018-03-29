const express = require('express');
const sqlite = require('sqlite');
const config = require('../config');
const UHandlers = require('../src/utils/handlers');

const router = express.Router();

router.get('/calibre', function(req, res) {
    sqlite.open(config.calibre.database).then(db => {
        return db.all('SELECT * FROM books ORDER BY last_modified DESC')
    }).then(response => {
        res.send(response);
    }).catch(err => UHandlers.handleError(res, 401, err))
});

module.exports = router;
