const express = require('express');
const router = express.Router();
const controller = require('../controllers/load.controller');

module.exports = function() {
    router.post('/create-load', controller.createLoad);
    router.get('/', controller.getAllLoads);
    router.get('/amount/:id/:perKm', controller.calculateLoadAmount);
    return router;
}