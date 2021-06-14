const express = require('express');
const router = express.Router();
const controller = require('../controllers/vehicle.controller');

module.exports = function() {
    router.post('/create-vehicle', controller.createVehicle);
    router.get('/', controller.getAllVehicles);
    router.get('/:id', controller.getLoadsOfVehicle);
    router.delete('/delete/:id', controller.deleteVehicle);
    router.put('/update/:id', controller.UpdateVehicle);
    return router;
}