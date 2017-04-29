// Import dependencies
var express = require('express');
var path = require('path');
var pg = require('pg');


//Setup DB credentials
var client = new pg.Client({
      user: 'postgres',
      password: 'postgres',
      database: 'airport',
      host: 'localhost',
      port: 5432
    });

//conect to postgrest
client.on('drain', client.end.bind(client));
client.connect();

var airportQuery = client.query("select a.name, a.country, a.city, ST_Distance(ST_GeomFromText('POINTZ( -16.3475995 -71.5606504 2335 )' ), a.location) as distance from station as a where ST_DWithin( ST_GeomFromText('POINTZ( -16.3475995 -71.5606504 2335 )' ), a.location, 200000) order by distance;");
console.log(airportQuery);

// Initialize server
var server = express();

// Setup statics middleware
server.use('/', express.static(__dirname+'/public'));





// Setup routes
server.get('/api/closest-airport', function (req, res) {
    // Query
    // ...
    res.json({
        id: 'asdasd',
        name: 'asdjhaksd'
    });
    res.send(airportQuery);
    res.end();
});

// Start server
server.listen(3000, function () {
    console.log('Server up at 3000');
})
