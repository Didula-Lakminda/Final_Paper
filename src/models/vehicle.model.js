const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema ({
    name: { type: String, require: true, trim: true },
    description: { type: String, require: true, trim: true },
    loads: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'loads' }]
});

const Vehicle = mongoose.model('vehicles', VehicleSchema);

module.exports = Vehicle;