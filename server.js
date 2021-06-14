const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const LoadAPI = require('./src/api/load.api');
const VehicleaPI = require('./src/api/vehicle.api')

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

/**
 * Db connect and ports
 */
const PORT = process.env.PORT || 8020;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error) => {
    if(error) {
        console.log('Database Connection Error : ', error.message);
    }
});

mongoose.connection.once('open', () => {
    console.log('Database Identified');
})

app.route('/').get((req, res) => {
    res.send('Final Paper');
});

app.use('/load', LoadAPI());
app.use('/vehicle', VehicleaPI());

module.exports = app;

app.listen(PORT, () => {
    console.log(`Server up and run on PORT ${PORT}`);
})