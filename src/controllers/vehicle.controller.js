const Vehicle = require('../models/vehicle.model');

const createVehicle = async (req, res) => {
    if(req.body) {
        const vehicle = new Vehicle(req.body);
        await vehicle.save()
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
};

const getAllVehicles = async (req, res) => {
    await Vehicle.find({  })
    .then(data => {
        res.status(200).send({ data: data });
    })
    .catch(error => {
        res.status(500).send({ error: error.message });
    });
};

const getLoadsOfVehicle = async (req, res) => {
    if(req.params && req.params.id) {
        await Vehicle.findById(req.params.id).populate('loads', 'code name load amountPKm')
        .then(data => {
            res.status(200).send({ loads: data.loads });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
};

const deleteVehicle = async (req, res) => {
    await Vehicle.findByIdAndDelete(req.params.id)
    .then(data => {
      res.status(200).send({ data: "Deleted Successfully" });
    })
    .catch(error => {
        res.status(500).send({ error: error.message });
    });
  };

  const UpdateVehicle = async(req, res) => {
    if(req.body && req.params.id)
    {
      await Vehicle.findByIdAndUpdate(req.params.id, {$addToSet: {
        loads: req.body.loadID
      }      
      })
      .then((data) => {
        res.status(200).send({ data: data })
      })
      .catch((error) => {
        res.status(500).send({ error: error.message })
      })
    }
};

module.exports = {
    createVehicle,
    getAllVehicles,
    getLoadsOfVehicle,
    deleteVehicle,
    UpdateVehicle
}
