var map = L.map('map').setView([0, 0], 1.5);

function moveISS() {
    $.getJSON('https://api.wheretheiss.at/v1/satellites/25544', function(data) {
        var lat = data['latitude'];
        var lon = data['longitude'];
        var al = data['altitude'];
        var velocity = data['velocity']
        var units = data['units'];
        var visibility = data['visibility'];



        // See leaflet docs for setting up icons and map layers
        // The update to the map is done here:

        $.getJSON('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lon + '&zoom=18&addressdetails=1', function(data) {
            var city = ""
            var error = data['error']
            var p = ""
            var link = ""
            var icon = ""
            if (error == "Unable to geocode") {
                var link = "https://www.google.fr/search?q=" + lat + "," + lon;
                var city = "Ocean"
                var icon = 'International_Flag_of_Planet_Earth.png'

            } else {

                var city = data['display_name'];
                var link = "https://www.google.fr/search?q=" + city;
                var p = data['address']['country_code']
                var icon = 'https://flagcdn.com/112x84/' + p + '.png'


            }

            document.getElementById("div_id").style.backgroundImage = "url(" + icon + ")";

            var logElem = document.querySelector(".log");




            logElem.innerHTML = lat + ": " + lon + " //" + al + "/" + velocity + "  " + units +
                "/ " + city.link(link, 'target_blank') + "  " + visibility;
            console.log("ok")





            // See leaflet docs for setting up icons and map layers
            // The update to the map is done here:






        });
        if (document.getElementById("huey").checked == true) {
            var slider = document.getElementById("myRange");
            map.setView([lat, lon], slider.value);

        } else {
            console.log("ok")
        }




        iss.setLatLng([lat, lon]);
        isscirc.setLatLng([lat, lon]);


    });
    setTimeout(moveISS, 1300);
}



L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=ZiYmBKmhzCx2qFTlCuIU', {
    maxZoom: 25,
    minZoom: 1.5,
    maxBoundsViscosity: 1.0,
}).addTo(map);
var southWest = L.latLng(-280, -360),
    northEast = L.latLng(280, 360);
var bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});
var terminator = L.terminator({

    fillOpacity: 0.25,
    weight: 1,
    color: '#1A1B1C',


}).addTo(map);
setInterval(function() {
    terminator.setTime();
}, 1); // Every minute

var greenIcon = L.icon({
    iconUrl: 'th.png',


    iconSize: [50, 55], // size of the icon

});
var iss = L.marker([0, 0], { icon: greenIcon }).addTo(map);
var isscirc = L.circle([0, 0], 2200e3, {
    color: "#c22",
    opacity: 0.3,
    weight: 1,
    fillColor: "#c22",
    fillOpacity: 0.1
}).addTo(map);



moveISS();

var grayscale = L.tileLayer(mapboxUrl, { id: 'https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=ZiYmBKmhzCx2qFTlCuIU', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution }),
    streets = L.tileLayer(mapboxUrl, { id: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=ZiYmBKmhzCx2qFTlCuIU', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution });

var map = L.map('map', {

    zoom: 10,
    layers: [grayscale, cities]
});