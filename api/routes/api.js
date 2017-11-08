
const express = require('express');
const router = express.Router();

const jwt    = require('jsonwebtoken');
const config = require('../config');
const ApiMiddlewares = require('../src/middlewares');
const Recources = require('../src/resources/resources');


router.use(ApiMiddlewares.token);


router.get('/', function(req, res) {
  res.send('');
});

router.get('/i18n', function(req, res) {
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

router.post('/login', function(req, res) {
    // TODO check from database
    jwt.sign({ user : 'admin', roles : ['ROLE_ADMIN', 'ROLE_USER'] }, config.apisecret, {expiresIn: 60*60*24 }, (err, token) => {
        if(err) res.status(500).json({});
        res.status(200).json({
            'token' : token
        });
    })
});

router.get('/menu', function(req, res) {
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

    menu.push({
        name : '',
        icon : 'glyphicon glyphicon-question-sign',
        items : [
            {
                name : 'Credit',
                path : '/credit',
                icon : 'glyphicon glyphicon-thumbs-up'
            }
        ]
    });

    if(req.connectedUser) {
        menu.push({
            name : req.connectedUser.user,
            path : '',
            icon : 'glyphicon glyphicon-user',
            items : [
                {
                    name : 'Profil',
                    path : '/user/profil',
                    icon : 'glyphicon glyphicon-cog'
                },
                {
                    name : 'Logout',
                    path : '/logout',
                    icon : 'glyphicon glyphicon-log-out'
                }
            ]
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

router.get('/resources', function(req, res) {
    Recources.getAll(req.connectedUser.roles).then(rows => {
        res.send(
            rows.map(row => JSON.parse(row.params))
        );
    }).catch(err => {
        res.status(500).json({ error : err.message });
    });
});

router.get('/resources/:item/columns', function(req, res) {
    Recources.getGridColumns(req.connectedUser.roles, req.params.item).then(columns => {
        res.send(columns);
    }).catch(err => {
        res.status(500).json({ error : err.message });
    });
});

router.get('/resources/:item/data', function(req, res) {
    Recources.getData(req.connectedUser.roles, req.params.item).then(rows => {
        res.send(
            rows.map(row => JSON.parse(row.data))
        );
    }).catch(err => {
        res.status(500).json({ error : err.message });
    });
});

router.get('/resources/:item', function(req, res) {
    Recources.getFeatures(req.connectedUser.roles, req.params.item).then(rows => {
        res.send({
            features : rows.map(row => JSON.parse(row.params)),
            grid : {
                columns : '/resources/' + req.params.item + '/columns',
                data : '/resources/' + req.params.item + '/data'
            }
        });
    }).catch(err => {
        res.status(500).json({ error : err.message });
    });
});

router.get('/resources/:item/features/info', function(req, res) {
    Recources.getFeaturesInfo(req.connectedUser.roles, req.params.item).then(rows => {
        res.send(rows);
    }).catch(err => {
        res.status(500).json({ error : err.message });
    });
});

module.exports = router;
