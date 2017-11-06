
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

router.get('/resources/:item/columns', function(req, res, next) {
    let ret = {};
    switch (req.params.item) {
        case 'rooms':
            ret = [
                {
                    headerName: "Code",
                    field: "code",
                    width: 50,
                    editable: true
                },
                {
                    headerName: "Name",
                    field: "name",
                    editable: true
                }
            ];
            break;
        case 'contents':
            ret = [
                {
                    headerName: "Code",
                    field: "code",
                    width: 50,
                    editable: true
                },
                {
                    headerName: "Name",
                    field: "name",
                    editable: true
                }
            ];
            break;
        case 'students':
            ret = [
                {
                    headerName: "Matricule",
                    field: "matricule",
                    width: 70,
                    editable: true
                },
                {
                    headerName: "Name",
                    field: "name",
                    editable: true
                }
            ];
            break;
        case 'teachers':
            ret = [
                {
                    headerName: "Name",
                    field: "name",
                    editable: true
                }
            ];
            break;
    }
    res.send(ret);
});
router.get('/resources/:item/data', function(req, res, next) {
    switch (req.params.item) {
        case 'rooms':
            res.send([
                { id: 'rooms:1', code: "S1", name: "Salle 1" },
                { id: 'rooms:2', code: "S2", name: "Salle 2" },
                { id: 'rooms:3', code: "S3", name: "Salle 3" },
                { id: 'rooms:4', code: "S4", name: "Salle 4" },
                { id: 'rooms:5', code: "S5", name: "Salle 5" },
                { id: 'rooms:6', code: "S6", name: "Salle 6" }
            ]);
            break;
        case 'contents':
            res.send([
                { id: 'contents:1', code: "C1", name: "Math" },
                { id: 'contents:2', code: "C2", name: "Philo" },
                { id: 'contents:3', code: "C3", name: "Histo" },
            ]);
            break;
        case 'students':
            res.send([
                { id: 'students:1', matricule: "ST1", name: "Rakoto Be" },
                { id: 'students:2', matricule: "ST2", name: "Rasoa Kinin" },
                { id: 'students:3', matricule: "ST3", name: "Toto Mwan" }
            ]);
            break;
        case 'teachers':
            res.send([
                { id: 'teachers:1', matricule: "TT1", name: "M. Be" },
                { id: 'teachers:2', matricule: "TT2", name: "Mlle Bal" },
                { id: 'teachers:3', matricule: "TT3", name: "Mme Bozy" }
            ]);
            break;

    }
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
