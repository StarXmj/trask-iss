var normal = L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=ZiYmBKmhzCx2qFTlCuIU', {
        id: 'MapID',
        tileSize: 512,
        zoomOffset: -1,
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }),
    hybrid = L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=ZiYmBKmhzCx2qFTlCuIU', {
        id: 'MapID',
        tileSize: 512,
        zoomOffset: -1,
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    });
topo = L.tileLayer('https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=ZiYmBKmhzCx2qFTlCuIU', {
    id: 'MapID',
    tileSize: 512,
    zoomOffset: -1,
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
});
black = L.tileLayer('https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=ZiYmBKmhzCx2qFTlCuIU', {
    id: 'MapID',
    tileSize: 512,
    zoomOffset: -1,
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
});

var map = L.map('map', {
    center: [0, 0],
    zoom: 1.5,
    minZoom: 1.5,
    layers: [normal]
});

var baseMaps = {
    "Normal": normal,
    "Satellite": hybrid,
    "Topographic": topo,
    "Black": black
};


L.control.layers(baseMaps).addTo(map);



function moveISS() {
    $.getJSON('https://api.wheretheiss.at/v1/satellites/25544', function(data) {
        var lat = data['latitude'];
        var lon = data['longitude'];
        var al = data['altitude'];
        var velocity = data['velocity']





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






            document.querySelector(".city").innerHTML = city;
            document.querySelector(".lat").innerHTML = lat;
            document.querySelector(".lon").innerHTML = lon;
            document.querySelector(".km").innerHTML = velocity;
            document.querySelector(".alt").innerHTML = al;

            console.log("ok")

            $('#some_id').click(function() {

                window.open(link, 'target_blank');
            });







            // See leaflet docs for setting up icons and map layers
            // The update to the map is done here:






        });
        if (document.getElementById("huey").checked == true) {

            map.setView([lat, lon], map.getZoom());


        } else {
            console.log("ok")

        }




        iss.setLatLng([lat, lon]);
        isscirc.setLatLng([lat, lon]);


    });
    setTimeout(moveISS, 1300);
}



var southWest = L.latLng(-280, -360),
    northEast = L.latLng(280, 360);
var bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});



var terminator = L.terminator({

    fillOpacity: 0.3,
    weight: 1,
    color: '#1A1B1C',


}).addTo(map);
setInterval(function() {
    terminator.setTime();
}, 1);

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

$('#toggle_fullscreen').on('click', function() {
    // if already full screen; exit
    // else go fullscreen
    if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    ) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
        element = $('#maps').get(0);
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
});

function dateDiff(date1, date2) {
    var diff = {}
    var tmp = date2 - date1;

    tmp = Math.floor(tmp / 1000);
    diff.sec = tmp % 60;

    tmp = Math.floor((tmp - diff.sec) / 60);
    diff.min = tmp % 60;

    tmp = Math.floor((tmp - diff.min) / 60);
    diff.hour = tmp % 24;

    tmp = Math.floor((tmp - diff.hour) / 24);
    diff.day = tmp;

    return diff;
}

function con() {

    date1 = new Date('1998-11-20 07:20:00');
    date2 = new Date();
    diff = dateDiff(date1, date2);
    document.querySelector(".con").innerHTML = diff.day + " : " + diff.hour + " : " + diff.min + " : " + diff.sec;

}



setInterval(con, 500);

function shut() {
    document.getElementById("popup1").style.display = "none";

}