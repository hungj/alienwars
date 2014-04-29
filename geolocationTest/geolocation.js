

	
		/*var img = new Image();
	img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=13&size=300x300&sensor=false";
location.appendChild(img);
*/


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
		//initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	});

});



var watch = navigator.geolocation.watchPosition(function(position) {
  //alert('blah');
	var location = document.getElementById('location');
	/*https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation
	https://developers.google.com/maps/documentation/javascript/examples/marker-simple*/

	var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
	var options = {
		zoom: 18,
		center: pos
	};
	var map = new google.maps.Map(location, options);

	var marker = new google.maps.Marker({
		position: pos,
		map: map
	});
});/*
var watchID = navigator.geolocation.watchPosition(function(position) {
  do_something(position.coords.latitude, position.coords.longitude);
});

  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);*/
