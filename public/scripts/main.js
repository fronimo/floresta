function init () {

    // Setup Google Map
    var map = new google.maps.Map(document.getElementsByClassName('map-filter')[0], {
        zoom: 13,
        center: { lat: -16.344812, lng: -71.56799 }
    });

    // Load closest airport
    var loadClosestAirport = function (pos, callback) {
        $.get('/api/closest-airport?lat='+pos.lat+'&lng='+pos.lng, function (body) {
            callback(body);
        });
    }

    // Setup markers
    var markers = {};
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
        })
    })
    markers.b.addListener('dragend', function () {
        loadClosestAirport({
            lat: markers.b.getPosition().lat(),
            lng: markers.b.getPosition().lng()
        }, function (airport) {
            console.log(airport);
        })
    })

}