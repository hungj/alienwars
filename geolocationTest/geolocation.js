
var map;


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
  maximumAge: 5000,
//  timeout: 2000
};
var calibrate = 0;
var watch = navigator.geolocation.watchPosition(setLocation, error, positionOptions);
function setLocation(position) {
  calibrate++;
  if (calibrate < 2)
    return;
	var loc = document.getElementById('location');
	/*https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation
	https://developers.google.com/maps/documentation/javascript/examples/marker-simple*/

	var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
	var options = {
		zoom: 18,
		center: pos
	};
	//var map = new google.maps.Map(loc, options);
  document.getElementById("coords").innerHtml += "<br/>"+ position.coords.latitude + " " + position.coords.longitude
	var marker = new google.maps.Marker({
		position: pos,
		map: map
	});

}
function error() {alert('error');}
