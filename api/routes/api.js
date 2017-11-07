
var express = require('express');
var router = express.Router();

const jwt    = require('jsonwebtoken');
const config = require('../config');
const ApiMiddlewares = require('../src/middlewares');
const Recources = require('../src/resources/resources');


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
    jwt.sign({ user : 'admin', roles : ['ROLE_ADMIN', 'ROLE_USER'] }, config.apisecret, {expiresIn: 60*60*24 }, (err, token) => {
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

    menu.push({
        name : 'Help',
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

// TODO store configuration into json field
//      resource    path    json
router.get('/resources', function(req, res, next) {
    Recources.getAll(req.connectedUser.roles).then(rows => {
        res.send(rows.map(row => {
            return JSON.parse(row.params);
        }));
    }).catch(err => {
        res.status(500).json({ error : err.message });
    });
});

router.get('/resources/:item/columns', function(req, res, next) {
    Recources.getGridColumns(req.connectedUser.roles, req.params.item).then(rows => {
        res.send(JSON.parse(rows[0].columns === null? '[]' : rows[0].columns));
    }).catch(err => {
        res.status(500).json({ error : err.message });
    });
});

router.get('/resources/:item/data', function(req, res, next) {
    Recources.getData(req.connectedUser.roles, req.params.item).then(rows => {
        res.send(rows.map(row => {
            return JSON.parse(row.data);
        }));
    }).catch(err => {
        res.status(500).json({ error : err.message });
    });
});


router.get('/resources/:item', function(req, res, next) {
    let ret = {};

    ret.information = {
        name : req.params.item.toUpperCase()
    };

    ret.features = [
        {
            name : 'View',
            path : '/resources/' + req.params.item + '/:id/info',
            icon : 'glyphicon glyphicon-info-sign',
            component : 'app-resource-info'
        },
        {
            name : 'Calendar',
            path : '/resources/' + req.params.item + '/:id/calendar',
            icon : 'glyphicon glyphicon-calendar',
            component : 'app-resource-calendar'
        },
        {
            name : 'Print',
            path : '/resources/' + req.params.item + '/:id/print',
            icon : 'glyphicon glyphicon-print',
            component : 'app-resource-print'
        }
    ];
    ret.grid = {
        columns : '/resources/' + req.params.item + '/columns',
        data : '/resources/' + req.params.item + '/data'
    };

    res.send(ret);

});


router.get('/resources/:item/:id/info', function(req, res, next) {
    res.send({
        general : {
            name: 'Rakoto',
            type: 'card',
            items: [
                {
                    label: 'photo',
                    value: 'http://lorempixel.com/100/100/people/9/',
                    type : 'picture'
                },
                {
                    label: 'nom',
                    value: 'Rakoto',
                    type : 'text'
                },
                {
                    label: 'prénom',
                    value: 'Solofo',
                    type : 'text'
                },
                {
                    label: 'naissance',
                    value: '2000-09-12',
                    type : 'date'
                }

            ]
        },
        parents : {
            name: 'Parents',
            type: 'card',
            items: [
                {
                    label: 'nom du père',
                    value: 'Rakoto rainy'
                }, {
                    label: 'profession',
                    value: 'Miasa mafy'
                }, {
                    label: 'nom de la mère',
                    value: 'Rakoto reniny'
                }, {
                    label: 'profession',
                    value: 'Miasa mafy koa ny reniny'
                }

            ]
        }
    });

});

module.exports = router;
