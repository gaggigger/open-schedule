var express = require('express');
var router = express.Router();

const jwt    = require('jsonwebtoken');
const config = require('../config');
const ApiMiddlewares = require('../src/middlewares');

router.get('/', function(req, res, next) {
  res.send('');
});

router.get('/i18n', function(req, res, next) {
    res.send([]);
});

router.post('/login', function(req, res, next) {
    // TODO check from database
    jwt.sign({ user : 'admin' }, config.apisecret, {expiresIn: 60*60*24 }, (err, token) => {
        if(err) res.status(500).json({});
        res.status(200).json({
            'token' : token
        });
    })
});

/**************************************************************
 *********** All route below are protected by token ***********/
router.use(ApiMiddlewares.token);
/*************************************************************/

router.get('/menu', function(req, res, next) {
    // TODO get from database
    res.send([
        {
            name : 'Resources',
            path : '/resources',
            icon : 'glyphicon glyphicon-th',
            items : [
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
            ]
        },
        {
            name : 'Logout',
            path : '/logout',
            icon : 'glyphicon glyphicon-log-out'
        }
    ]);
});

router.get('/resources', function(req, res, next) {
    // TODO get from database
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
