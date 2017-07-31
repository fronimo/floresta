function create_mark(mark,map,_lat, _long,img){
    var marker = new google.maps.Marker({
        label: 'A',
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: img,
        position: { lat: _lat, lng: _long }
    });
    mark.push(marker);
}
function init(){

    var markers = [];
    var tam = 0;
    var image = '/images/';
    var trees = ['arbol1.png', 'arbol2.png','arbol3.png','arbol4.png','arbol5.png','arbol6.png','arbol7.png','arbol8.png','arbol9.png','arbol10.png','arbol11.png','arbol12.png','arbol13.png','arbol14.png','arbol15.png','arbol16.png','arbol17.png','arbol18.png','arbol19.png','arbol20.png','arbol21.png','arbol22.png','arbol23.png','arbol24.png','arbol25.png','arbol26.png'];
    var cuenta = 0;
    var nro = $('#arbol').val();
    //var c = document.URL;
    //document.getElementById('arbol').value = nro;

    //console.log(c);
    var img_tree = image+trees[(parseInt(nro)%26)];
    console.log(img_tree);

    var map = new google.maps.Map(document.getElementsByClassName('map-filter')[0], {
        zoom: 13,
        center: { lat: -16.344812, lng: -71.56799 }
    });

    
    var poss = 2;
    var text;
    var loadInfo = function (pos,callback) {
        $.get('/api/clo?lat=11', function (body) {
            callback(body);
        });
    }

    //create_mark(markers,map,-16.344812,-71.56799);
    
    
    var tmp = loadInfo(poss,function(rell){
        //console.log(rell);
        text = rell.split("\n");
        tam = text.length;
        console.log("tama: "+tam);
        //console.log(text);
        console.log(text.length);
        for (var i = 0; i < tam; i++){
            text[i] = text[i].split(",");
        }
        /*console.log(text[0],map.center);
        map.center.lat = parseFloat(text[0][1]);
        map.center.lng = parseFloat(text[0][2]);*/
        
        var my_lat = 0;
        var my_lng = 0;
        for(var i = 0; i < tam; i = i + 20){
            if(text[i][3] == nro){
                my_lat = parseFloat(text[i][1]);
                my_lng = parseFloat(text[i][2]);
                cuenta++;
                create_mark(markers,map,parseFloat(text[i][1]),parseFloat(text[i][2]),img_tree);
            }
            
        }
        /*var marker_tmp = new google.maps.Marker({
            label: 'A',
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: { lat: my_lat, lng: my_lng }
        });
        console.log(marker_tmp.getPosition());*/
        map.setCenter({lat: my_lat, lng: my_lng}); 
        console.log("Cuenta: " + cuenta);
        console.log(259%26);
        console.log(2%26);
        console.log(5%26);
        //console.log(typeof(text[0][1]));
        //console.log(text);
        //text = rell;
    });

}