const express = require('express');
const router = express.Router();

const jwt    = require('jsonwebtoken');
const config = require('../config');
const ApiMiddlewares = require('../src/middlewares');
const Recources = require('../src/resources/resources');
const Choicelists = require('../src/choicelists/choicelists');

const RecourcesFeatures = require('../src/resources/features');
const Attachments = require('../src/attachments/attachments');
const User = require('../src/user/user');
const UHandlers = require('../src/utils/handlers');
const bodyParser = require('body-parser');


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
    User.connect(req.body.user, req.body.password).then(user => {
        // Transform RowDataPacket to simple Json
        user = JSON.parse(JSON.stringify(user));
        jwt.sign(user, config.apisecret, {expiresIn: 60*60*24 }, (err, token) => {
            if(err) {
                UHandlers.handleError(res, 401, err);
                return false;
            }
            res.status(200).json({
                'token' : token
            });
        });
    }).catch(err => UHandlers.handleError(res, 401, err));
});

router.get('/menu', function(req, res) {
    Promise.all([
        Recources.getAll(req.connectedUser? req.connectedUser.roles : []),
    ]).then(values => {
        // Resources menu
        let menu = [{
            name : 'Resources',
            path : '/resources',
            icon : 'glyphicon glyphicon-th',
            items : []
        }];
        values[0].map(item => {
            let param = JSON.parse(item.params);
            menu[0].items.push({
                name : item.name,
                path : param.path,
                icon : param.icon
            });
        });

        // Login menu
        if(req.connectedUser) {
            menu.push({
                name : req.connectedUser.username,
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

        // Help menu
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

        res.send(menu);

    }).catch(err => {
        console.log(err);
    });
});

/**************************************************************
 *********** All route below are protected by token ***********/
router.use(ApiMiddlewares.protect);
/*************************************************************/

router.get('/choicelists', function(req, res) {
    Choicelists.get(req.connectedUser, req.params.uuid).then(rows => {
        res.send(rows);
    }).catch(err => UHandlers.handleError(res, 500, err));
});


router.put('/attachments', function(req, res) {
    let body = '';

    req.addListener('data', chunk => body += chunk);
    req.addListener('error', error => next(err));
    req.addListener('end', chunk => {
        if (chunk) body += chunk;
        Attachments.set(req.connectedUser, body, req.query.item_id).then(rows => {
            res.send(rows);
        }).catch(err => UHandlers.handleError(res, 500, err));
    });
});

router.get('/attachments/:uuid', function(req, res) {
    Attachments.get(req.connectedUser, req.params.uuid).then(rows => {
        if(rows[0]) {
            res.contentType('image/jpeg');
            res.end(rows[0].content);
        }else {
            res.contentType('image/jpeg');
            res.end(0x00);
        };
    }).catch(err => UHandlers.handleError(res, 500, err));
});

router.get('/resources', function(req, res) {
    Recources.getAll(req.connectedUser.roles).then(rows => {
        res.send(
            rows.map(row => JSON.parse(row.params))
        );
    }).catch(err => UHandlers.handleError(res, 500, err));
});

router.get('/resources/:item/columns', function(req, res) {
    Recources.getGridColumns(req.connectedUser.roles, req.params.item).then(columns => {
        res.send(columns);
    }).catch(err => UHandlers.handleError(res, 500, err));
});

router.get('/resources/items/data', function(req, res) {
    Recources.getData(req.connectedUser.roles, { ids : req.query.ids.split(',') }).then(rows => {
        res.send(
            rows.map(row => JSON.parse(row.data))
        );
    }).catch(err => UHandlers.handleError(res, 500, err));
});

router.get('/resources/:item/data', function(req, res) {
    Recources.getData(req.connectedUser.roles, { resource : req.params.item }).then(rows => {
        res.send(
            rows.map(row => JSON.parse(row.data))
        );
    }).catch(err => UHandlers.handleError(res, 500, err));
});

router.get('/resources/:item', function(req, res) {
    RecourcesFeatures.getFeatures(req.connectedUser.roles, req.params.item).then(rows => {
        res.send({
            features : rows.map(row => JSON.parse(row.params)),
            grid : {
                columns : '/resources/' + req.params.item + '/columns',
                data : '/resources/' + req.params.item + '/data'
            }
        });
    }).catch(err => UHandlers.handleError(res, 500, err));
});

router.get('/resources/:item/features/info', function(req, res) {
    RecourcesFeatures.getFeaturesInfo(req.connectedUser.roles, req.params.item).then(rows => {
        res.send(rows);
    }).catch(err => UHandlers.handleError(res, 500, err));
});

router.put('/resources/:item/features/info', function(req, res) {
    RecourcesFeatures.createItems(req.connectedUser.roles, req.params.item, req.body.data).then(rows => {
        res.send(rows);
    }).catch(err => UHandlers.handleError(res, 403, err));
});

router.get('/resources/:item/features/calendar', function(req, res) {
    res.send([
        {
            title: 'All Day Event',
            start: '2017-11-01'
        },
        {
            title: 'Long Event',
            start: '2017-11-07',
            end: '2017-11-10'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: '2017-11-09T16:00:00'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: '2017-11-16T16:00:00'
        },
        {
            title: 'Conference',
            start: '2017-11-11',
            end: '2017-11-13'
        },
        {
            title: 'Meeting',
            start: '2017-11-12T10:30:00',
            end: '2017-11-12T12:30:00'
        },
        {
            title: 'Lunch',
            start: '2017-11-12T12:00:00'
        },
        {
            title: 'Meeting',
            start: '2017-11-12T14:30:00'
        },
        {
            title: 'Happy Hour',
            start: '2017-11-12T17:30:00'
        },
        {
            title: 'Dinner',
            start: '2017-11-12T20:00:00'
        },
        {
            title: 'Birthday Party',
            start: '2017-11-13T07:00:00'
        },
        {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2017-11-28'
        }
    ]);
});

module.exports = router;
