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

router.get('/resources/:item', function(req, res, next) {
    let ret = {};

    ret.information = {
        name : req.params.item.toUpperCase()
    };

    ret.features = [
        {
            name : 'View',
            path : '/resources/' + req.params.item + '/information',
            icon : 'glyphicon glyphicon-info-sign'
        },
        {
            name : 'Calendar',
            path : '/resources/' + req.params.item + '/calendar',
            icon : 'glyphicon glyphicon-calendar'
        },
        {
            name : 'Print',
            path : '/resources/' + req.params.item + '/print',
            icon : 'glyphicon glyphicon-print'
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
                { id: 1, code: "S1", name: "Salle 1" },
                { id: 2, code: "S2", name: "Salle 2" },
                { id: 3, code: "S3", name: "Salle 3" },
                { id: 4, code: "S4", name: "Salle 4" },
                { id: 5, code: "S5", name: "Salle 5" },
                { id: 6, code: "S6", name: "Salle 6" }
            ]);
            break;
        case 'contents':
            res.send([
                { id: 1, code: "C1", name: "Math" },
                { id: 2, code: "C2", name: "Philo" },
                { id: 3, code: "C3", name: "Histo" },
            ]);
            break;
        case 'students':
            res.send([
                { id: 1, matricule: "ST1", name: "Rakoto Be" },
                { id: 2, matricule: "ST2", name: "Rasoa Kinin" },
                { id: 3, matricule: "ST3", name: "Toto Mwan" }
            ]);
            break;
        case 'teachers':
            res.send([
                { id: 1, matricule: "TT1", name: "M. Be" },
                { id: 2, matricule: "TT2", name: "Mlle Bal" },
                { id: 3, matricule: "TT3", name: "Mme Bozy" }
            ]);
            break;

    }
});

module.exports = router;
