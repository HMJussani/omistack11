const express = require('express');
const routes = express.Router();
const ongController = require('../src/controllers/ongController');
const profileOngController = require('../src/controllers/profileOngController');
const incidentController = require('../src/controllers/incidentController');
const sessionController = require('../src/controllers/sessionController');


routes.get('/ongs',ongController.read);
routes.get('/',ongController.welcome);
routes.post('/ongs',ongController.create);
routes.post('/sessions',sessionController.create);

routes.post('/incidents',incidentController.create);
routes.get('/incidents',incidentController.read);
routes.delete('/incidents/:id',incidentController.delete);

routes.get('/profile',profileOngController.readOng);


module.exports = routes;