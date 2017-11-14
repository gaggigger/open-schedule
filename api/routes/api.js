
const express = require('express');
const router = express.Router();

const jwt    = require('jsonwebtoken');
const config = require('../config');
const ApiMiddlewares = require('../src/middlewares');
const Recources = require('../src/resources/resources');
const RecourcesFeatures = require('../src/resources/features');
const User = require('../src/user/user');
const UHandlers = require('../src/utils/handlers');


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
    let menuResources = Recources.getAll(req.connectedUser.roles);
    Promise.all([menuResources]).then(values => {
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


        res.send(menu);
    }).catch(err => {
        console.log(err);
    });
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
    }).catch(err => UHandlers.handleError(res, 500, err));
});

router.get('/resources/:item/columns', function(req, res) {
    Recources.getGridColumns(req.connectedUser.roles, req.params.item).then(columns => {
        res.send(columns);
    }).catch(err => UHandlers.handleError(res, 500, err));
});

router.get('/resources/:item/data', function(req, res) {
    Recources.getData(req.connectedUser.roles, req.params.item).then(rows => {
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

module.exports = router;
