const Load = require('../models/load.model');

const createLoad = async (req, res) => {
    if(req.body) {
        const load = new Load(req.body);
        await load.save()
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
};

const getAllLoads = async (req, res) => {
    await Load.find({  })
    .then(data => {
        res.status(200).send({ data: data });
    })
    .catch(error => {
        res.status(500).send({ error: error.message });
    });
};

const calculateLoadAmount = async (req, res) => {
    if(req.params && req.params.id) {
        
      const load = await Load.findById(req.params.id);
      let amount = 0;
      amount = req.params.perKm * load.amountPKm;
  
      res.status(200).send({ amount: amount })
    }
  }


module.exports = {
    createLoad,
    getAllLoads,
    calculateLoadAmount,
}