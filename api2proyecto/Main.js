const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const https = require('https');
const fs = require('fs');
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});*/

//imports
const personRoutes = require('./Routes/routes');
app.set('port', 3031);
var port = process.env.PORT || 3031;
//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//routes
app.use(personRoutes);
app.listen(3031, "192.168.0.35",() => {
    console.log(`El servidor at http://192.168.0.35:${port}/`)
});
