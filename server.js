// Import dependencies
var express = require('express');
var path = require('path');
//var pg = require('pg');

var fs = require('fs');

var info;

fs.readFile('./public/files/result.csv', 'utf8', function(error, data){
  info = data;
    //console.log(data);
});


//Setup DB credentials
/*var client = new pg.Client({
      user: 'postgres',
      password: 'postgres',
      database: 'airport',
      host: 'localhost',
      port: 5432
    });
*/
//conect to postgrest
//client.connect();


// Initialize server
var server = express();

// Setup statics middleware
server.use('/', express.static(__dirname+'/public'));

  
server.get('/api/clo', function(req,res){
  res.send(info);
  res.end();
})

// Setup routes
/*server.get('/api/closest-airport', function (req, res) {
    client.query("select a.id, a.name, a.country, a.city, ST_Distance(ST_GeomFromText('POINTZ( "+req.query.lat+" "+req.query.lng+" 2335 )' ), a.location) as distance from station as a where ST_DWithin( ST_GeomFromText('POINTZ( "+req.query.lat+" "+req.query.lng+" 2335 )' ), a.location, 200000) order by distance;", function(err, results) {
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
*/
/*server.get('/api/flights', function (req, res) {
  client.query("select distinct a.name, a.Country from flights as a inner join sourceStation as ss on a.source_airport_id=ss.id inner join destinationStation as ds on a.destination_airport_id = ds.id where ss.id="+req.query.id1+" and ds.id="+req.query.id2+";", function(err, results) {
    if(err){
        res.status(500);
        res.send(err);
        res.end();
        return;
      }
      res.send(results.rows);
      res.end();
  });

});
*/
// Start server
server.listen(3000, function () {
    console.log('Server up at 3000');
})
