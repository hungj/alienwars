
var map;


var RADIUS = 1;

google.maps.event.addDomListener(window, 'load', function initialize() {
	var latitude, longitude;
	navigator.geolocation.getCurrentPosition(function(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;	
  var mapOptions = {
    zoom: 18,
    center: new google.maps.LatLng(latitude, longitude)
  };
  map = new google.maps.Map(document.getElementById('location'), mapOptions);
  document.getElementById('coords').innerHTML = latitude + " " + longitude;
	});
});

var calibrate = 0;
var positionOptions = {
  maximumAge: 5000
};
var PTS = 3;
var total = 0;
var googleCoords = [];
var calibrateCoords = [];
var watch = navigator.geolocation.watchPosition(setLocation, error, positionOptions);

function setLocation(position) {
	var loc = document.getElementById('location');
	/*https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation
	https://developers.google.com/maps/documentation/javascript/examples/marker-simple*/

	var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
  googleCoords.push(position);
  calibrate++;
	total += googleCoords[calibrate-1].coords.accuracy;
  var options = {
		zoom: 18,
		center: pos
	};
  document.getElementById("coords").innerHtml += "<br/>"+ position.coords.latitude + " " + position.coords.longitude;
	if ((calibrate % PTS) == 0) {
    var cLatitude = 0;
    var cLongitude = 0;
    for (var i = 0; i < PTS; i++) {
      cLatitude += (1-googleCoords[calibrate-i-1].coords.accuracy/total)*googleCoords[calibrate-1-i].coords.latitude;
      cLongitude += (1-googleCoords[calibrate-i-1].coords.accuracy/total)*googleCoords[calibrate-1-i].coords.longitude;
    }
    total = 0;
    cLatitude = cLatitude / (PTS - 1);
    cLongitude = cLongitude / (PTS - 1);
    var cLocation = new google.maps.LatLng(cLatitude, cLongitude);
    var marker = new google.maps.Circle({
		  clickable: false,
      center: cLocation,
	  	map: map,
      radius: RADIUS,
      strokeColor: "#FF0000"
  	});
    calibrateCoords.push(cLocation);
    if (calibrateCoords.length > 0) {
        var lineCoords = [calibrateCoords[length-2], calibrateCoords[length-1]];
        var line = new google.maps.Polyline({
          path: lineCoords,
          geodesic: true,
          strokeColor: '#FFFF00',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: map
        });
        coords.push(newPos);
}} }
function error() {alert('error');}
