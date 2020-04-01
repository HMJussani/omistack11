const express = require('express');
const routes = express.Router();
const ongController = require('../src/controllers/ongController');
const profileOngController = require('../src/controllers/profileOngController');
const incidentController = require('../src/controllers/incidentController');
const sessionController = require('../src/controllers/sessionController');
const userController = require('../src/controllers/userController');


routes.get('/ongs',ongController.read);
routes.delete('/delongs',ongController.delete);
routes.get('/',ongController.welcome);
routes.post('/ongs',ongController.create);
routes.post('/sessions',sessionController.create);

routes.post('/user',userController.create);
routes.get('/user',userController.read);
routes.get('/userid',userController.readOnly);
routes.delete('/userdel',userController.delete);

routes.post('/incidents',incidentController.create);
routes.get('/incidents',incidentController.read);
routes.delete('/incidents/:id',incidentController.delete);

routes.get('/profile',profileOngController.readOng);


module.exports = routes;