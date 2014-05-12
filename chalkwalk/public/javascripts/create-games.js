function GameCreator(inputId, errorMsgId) {
	this.input = document.getElementById(inputId);
	this.errorMsg = document.getElementById(errorMsgId);
}

GameCreator.prototype.addGametoDB = function(gameName, username) {
	request = new XMLHttpRequest();
	request.open('POST', '/create/' + gameName + "/" + username, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400){
	    alert("game successfully created");
	    resp = request.responseText;
	    // TODO Transition to Game start
	  } else {
	    alert("error");
	  }
	};

	request.onerror = function() {
		alert("Request failed to send.");
	};

	request.send();
}

GameCreator.prototype.create = function() {
	var gameName = this.input.value;
	var gamecreator = this;
	if (gameName == "") {
		this.errorMsg.innerHTML = "Game name can't be blank.";
		this.errorMsg.style.display = 'block';
		return;
	} else {
		var request = new XMLHttpRequest();
		request.open('GET', '/gamefinder/' + gameName, true);
		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				data_array = JSON.parse(request.responseText);
				if (data_array.length == 0) {
					// create the game
					gamecreator.errorMsg.style.display = 'none';
					gamecreator.addGametoDB(gameName, localStorage.username);
				} else {
					// this game already exists
					gamecreator.errorMsg.innerHTML = "A game with that name already exists";
					gamecreator.errorMsg.style.display = 'block';
					return;
				}
			} else {
				alert("Error");
			}
		}

		request.onerror = function() {
			console.log("Request faild to send");
		};

		request.send();
	}
}

