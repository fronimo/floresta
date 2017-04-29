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
//client.on('drain', client.end.bind(client));
client.connect();


// Initialize server
var server = express();

// Setup statics middleware
server.use('/', express.static(__dirname+'/public'));

  



// Setup routes
server.get('/api/closest-airport', function (req, res) {
    client.query("select a.id, a.name, a.country, a.city, ST_Distance(ST_GeomFromText('POINTZ( "+req.query.lat+" "+req.query.lng+" 2335 )' ), a.location) as distance from station as a where ST_DWithin( ST_GeomFromText('POINTZ( "+req.query.lat+" "+req.query.lng+" 2335 )' ), a.location, 200000) order by distance;", function(err, results){
      if(err){
        res.status(500);
        res.send(err);
        res.end();
        return;
      }
      res.send(results.rows[0] || {});
      
      res.end();
      
    });

});

// Start server
server.listen(3000, function () {
    console.log('Server up at 3000');
})
