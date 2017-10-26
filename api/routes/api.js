var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/resources', function(req, res, next) {
    res.send([
        {
            name : 'Salles',
            path : '/resources/rooms',
            icon : 'glyphicon glyphicon-home'
        },
        {
            name : 'Matières',
            path : '/resources/contents',
            icon : 'glyphicon glyphicon-book'
        },
        {
            name : 'Elèves',
            path : '/resources/students',
            icon : 'glyphicon glyphicon-user'
        },
        {
            name : 'Enseignants',
            path : '/resources/teachers',
            icon : 'glyphicon glyphicon-user'
        }
    ]);
});

router.get('/resources/menu', function(req, res, next) {
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
