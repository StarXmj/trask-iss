function state(s) {
    var dict = new Object();

    // or the shorthand way
    var dict = [
        "us-ak", "us-al", "us-ar", "us-az", "us-ca", "us-co", "us-ct", "us-de", "us-fl", "us-ga",
        "us-hi", "us-ia", "us-id", "us-il", "us-in", "us-ks", "us-ky", "us-la", "us-ma", "us-md", "us-me",
        "us-mi", "us-mn", "us-mo", "us-ms", "us-mt", "us-nc", "us-nd", "us-ne", "us-nh", "us-nj",
        "us-nm", "us-nv", "us-ny", "us-oh", "us-ok", "us-or", "us-pa", "us-ri", "us-sc", "us-sd", "us-tn", "us-tx",
        "us-ut", "us-va", "us-vt", "us-wa", "us-wi", "us-wv", "us-wy",
    ];

    var dict2 = [
        "Alaska", "Alabama", "Arkansas", "Arizona", "Californie", "Colorado", "Connecticut",
        "Delaware", "Floride", "Géorgie", "Hawaï", "Iowa", "Idaho", "Illinois", "Indiana",
        "Kansas", "Kentucky", "Louisiane", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota",
        "Missouri", "Mississippi", "Montana", "Caroline du Nord", "Dakota du Nord", "Nebraska", "New Hampshire",
        "New Jersey", "Nouveau-Mexique", "Nevada", "New York", "Ohio", "Oklahoma",
        "Oregon", "Pennsylvanie", "Rhode Island", "Caroline du Sud", "Dakota du Sud", "Tennessee", "Texas", "Utah", "Virginie", "Vermont", "Washington", "Wisconsin",
        "Virginie-Occidentale", "Wyoming",
    ];
    return (dict[dict2.indexOf(s)])
}

var map = L.map('map').setView([0, 0], 2);

function moveISS() {
    $.getJSON('https://api.wheretheiss.at/v1/satellites/25544', function(data) {
        var lat = data['latitude'];
        var lon = data['longitude'];
        var al = data['altitude'];
        var velocity = data['velocity']
        var units = data['units'];


        // See leaflet docs for setting up icons and map layers
        // The update to the map is done here:

        $.getJSON('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lon + '&zoom=18&addressdetails=1', function(data) {
            var city = ""
            var error = data['error']
            var p = ""
            var link = ""
            if (error == "Unable to geocode") {
                var link = "https://www.google.fr/search?q=" + lat + "," + lon;
                var city = "Ocean"
                document.getElementById("div_id").style.backgroundImage = "url('International_Flag_of_Planet_Earth.png')";
            } else {

                var city = data['display_name'];
                var link = "https://www.google.fr/search?q=" + city;
                var p = data['address']['country_code']
                document.getElementById("div_id").style.backgroundImage = "url('https://flagcdn.com/112x84/" + p + ".png')";

            }


            var logElem = document.querySelector(".log");


            logElem.innerHTML = lat + ": " + lon + " //" + al + "/" + velocity + units +
                "/ " + city + " ^^" + link.link(link, 'target_blank');
            console.log("ok")



            // See leaflet docs for setting up icons and map layers
            // The update to the map is done here:






        });


        iss.setLatLng([lat, lon]);
        isscirc.setLatLng([lat, lon]);

    });
    setTimeout(moveISS, 1300);
}

function link() {
    window.open(link, '_blank');
}



L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=ZiYmBKmhzCx2qFTlCuIU', {
    maxZoom: 25,
    minZoom: 1.5,
}).addTo(map);
var terminator = L.terminator({

    fillOpacity: 0.2


}).addTo(map);
setInterval(function() {
    terminator.setTime();
}, 500); // Every minute


var iss = L.marker([0, 0]).addTo(map);
var isscirc = L.circle([0, 0], 2200e3, {
    color: "#c22",
    opacity: 0.3,
    weight: 1,
    fillColor: "#c22",
    fillOpacity: 0.1
}).addTo(map);



moveISS();