const express = require('express');
const routes = express.Router();
const ongController = require('../src/controllers/ongController');
const profileOngController = require('../src/controllers/profileOngController');
const incidentController = require('../src/controllers/incidentController');

routes.get('/ongs',ongController.read);

routes.post('/ongs',ongController.create);

routes.post('/incidents',incidentController.create);
routes.get('/incidents',incidentController.read);
routes.delete('/incidents/:id',incidentController.delete);

routes.get('/profile',profileOngController.readOng);


module.exports = routes;