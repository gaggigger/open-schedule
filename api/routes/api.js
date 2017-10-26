var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/resources', function(req, res, next) {
    res.send([
        {
            name : 'Resources',
            path : '/resources',
            items : [
                {
                    name : 'Salles',
                    path : '/resources/rooms'
                },
                {
                    name : 'Matières',
                    path : '/resources/contents'
                }
            ]
        }

    ]);
});

module.exports = router;
