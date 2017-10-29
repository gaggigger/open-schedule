var express = require('express');
var router = express.Router();

const jwt    = require('jsonwebtoken');
const config = require('../config');
const ApiMiddlewares = require('../src/middlewares');


router.use(ApiMiddlewares.token);


router.get('/', function(req, res, next) {
  res.send('');
});

router.get('/i18n', function(req, res, next) {
    res.send({
        'OpenSchedule' : 'OpenSchedule',
        // Title
        'Home' : 'Accueil',
        'Resources' : 'Ressources',
        // Error Pages
        'Forbidden' : 'Interdit',
        'Error' : 'Erreur',
        'Page not found' : 'Page non trouvée',
        'Service Unavailable' : 'Service indisponible',
        // Login
        'Login' : 'Connexion',
        'Username' : 'Identifiant',
        'Password' : 'Mot de passe'

    });
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

router.get('/menu', function(req, res, next) {
    // TODO get from database
    let menu = [
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
        }
    ];
    if(req.connectedUser) {
        menu.push({
            name : 'Logout',
            path : '/logout',
            icon : 'glyphicon glyphicon-log-out'
        });
    }else {
        menu.push({
            name : 'Login',
            path : '/login',
            icon : 'glyphicon glyphicon-log-in'
        });
    }

    res.send(menu);
});

/**************************************************************
 *********** All route below are protected by token ***********/
router.use(ApiMiddlewares.protect);
/*************************************************************/

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
