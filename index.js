const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.DB_URL; 

mongoose.connect(MONGODB_URI,
    { 
        tlsAllowInvalidCertificates: true 
    })
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.log(err));

app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
