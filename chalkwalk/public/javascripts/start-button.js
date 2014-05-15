/*
 * StartButton
 * A class to control the start button on the waiting room page.  The master of the
 * game selects this to transition from the waiting room to gameplay. 
 */
function StartButton(buttonId, roleCounter) {
	this.button = document.getElementById(buttonId);
	this.roleCounter = roleCounter;
}
/*
 * revealButton()
 * Reveals a Start button on the waiting room page.  When the Start button is pressed,
 * generate a random image object and push that to Firebase.  
 */
StartButton.prototype.implementButton = function (gameName) {
	var startButton = this;
	this.button.style.display = 'block';
	this.button.addEventListener("click", function(){
		if (startButton.roleCounter.Drawer < 1 || startButton.roleCounter < 1) {
			alert("You must have at least 1 Drawer and 1 Guesser!");
			return;
		}
		var fb = new Firebase('https://outdoorspictionary.firebaseIO.com/Games/' + gameName + '/start');
		var randomImage = getRandomImage();
		fb.push(randomImage);
	});
}

/*
 * initialize()
 * Checks MongoDB to see if the user is the master of the game room.  If he or she is, then call
 * revealButton.
 */
StartButton.prototype.initialize = function(username, gameName) {
	var startButton = this;
	var request = new XMLHttpRequest();
	request.open('GET', '/gamefinder/' + gameName, true);
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			data_array = JSON.parse(request.responseText);
			if (data_array.length > 0) {
				var master = data_array[0].master;
				if (username == master) {
					startButton.implementButton(gameName);
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