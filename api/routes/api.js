var express = require('express');
var router = express.Router();
const ApiMiddlewares = require('../src/middlewares');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**************************************************************
 *********** All route below are protected by token ***********/
router.use(ApiMiddlewares.token);
/*************************************************************/

router.get('/menu', function(req, res, next) {
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

module.exports = router;
