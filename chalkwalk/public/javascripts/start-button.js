function StartButton(buttonId) {
	this.button = document.getElementById(buttonId);
}

StartButton.prototype.revealButton = function () {
	this.button.style.display = 'block';
	this.button.addEventListener("click", function(){
		var fb = new Firebase('https://outdoorspictionary.firebaseIO.com/Games/' + localStorage.game + '/start');
		fb.push({'started':true});
	});
}

StartButton.prototype.initialize = function() {
	var startButton = this;
	var request = new XMLHttpRequest();
	request.open('GET', '/gamefinder/' + localStorage.game, true);
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			data_array = JSON.parse(request.responseText);
			if (data_array.length > 0) {
				var master = data_array[0].master;
				if (localStorage.username == master) {
					// This user is the master!
					startButton.revealButton();
				}
			} else {	
				console.log("error.  game not found");
			}
		} else {
			console.log("error");
		}
	};

	request.onerror = function() {
		console.log("Request faild to send");
	};

	request.send();
}