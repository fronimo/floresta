function init () {

    // Setup Google Map
    var map = new google.maps.Map(document.getElementsByClassName('map-filter')[0], {
        zoom: 5,
        center: { lat: -16.344812, lng: -71.56799 }
    });

    // Load closest airport
    var loadClosestAirport = function (pos, callback) {
        $.get('/api/closest-airport?lat='+pos.lat+'&lng='+pos.lng, function (body) {
            callback(body);
        });
    }

    // Load flights to airports
    var flightsToAirports = function (id1, id2, callback){
        $.get('/api/flights?id1='+id1+'&id2='+id2, function (body) {
            callback(body);
        });
    }

    // Setup markers
    var markers = {};
    var airports = {};
    markers.a = new google.maps.Marker({
        label: 'A',
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: { lat: -16.344812, lng: -71.56799 }
    });
    markers.b = new google.maps.Marker({
        label: 'B',
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: { lat: -16.344812, lng: -71.56799 }
    });

    // Setup markers listeners
    markers.a.addListener('dragend', function () {
        loadClosestAirport({
            lat: markers.a.getPosition().lat(),
            lng: markers.a.getPosition().lng()
        }, function (airport) {
            console.log(airport);
            airports.a = airport;
            if(airports.a && airports.b) {
                flightsToAirports(airports.a.id, airports.b.id, function(flights) {
                    console.log(flights);
                    var my_table = document.createElement("table");
                    var container = document.getElementsByClassName("results-container")[0];
                    container.innerHTML = "";
                    container.appendChild(my_table);
                    for(var i = 0; i < flights.length; i++) {
                        var my_tr = document.createElement("tr");
                        var my_td = document.createElement("td");
                        my_td.innerHTML = flights[i].name;
                        my_tr.appendChild(my_td);
                        my_table.appendChild(my_tr);
                    }
                });
            }
        })
    })
    markers.b.addListener('dragend', function () {
        loadClosestAirport({
            lat: markers.b.getPosition().lat(),
            lng: markers.b.getPosition().lng()
        }, function (airport) {
            console.log(airport);
            airports.b = airport;
            if(airports.a && airports.b) {
                flightsToAirports(airports.a.id, airports.b.id, function(flights) {
                    console.log(flights);
                });
            }
        })
    })

    /*var my_table = document.createElement("table");
    var container = document.getElementsByClassName("results-container")[0];
*/
//    container.appendChild(my_table);


}