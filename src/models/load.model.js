const mongoose = require('mongoose');

const LoadSchema = new mongoose.Schema ({
    code: { type: String, require: true, trim: true },
    name: { type: String, require: true, trim: true },
    load: { type: Number, require: true, min: 0, max: 5 },
    amountPKm: { type: Number, require: true, },
    vehicles: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'vehicles' }]
});

const Load = mongoose.model('loads', LoadSchema);

module.exports = Load;