function GameFinder(tableId, tbodyId, inputId, errorMsgId) {
	this.table = document.getElementById(tableId);
	this.tbody = document.getElementById(tbodyId);
	this.input = document.getElementById(inputId);
	this.errorMsg = document.getElementById(errorMsgId);
}

GameFinder.prototype.createHeaderRow = function() {
	this.tbody.innerHTML = '';
	var headRow = document.createElement("tr");
	var header1 = document.createElement("th");
	header1.innerHTML = "Game Name";
	var header2 = document.createElement("th");
	header2.innerHTML = "Join";
	headRow.appendChild(header1);
	headRow.appendChild(header2);
	this.tbody.appendChild(headRow);
}

GameFinder.prototype.joinGame = function(gameName, username) {
	if (username == "" || username == undefined) {
		alert("Please log in first.");
		return;
	}
	request = new XMLHttpRequest();
	request.open('PUT', '/join/' + gameName + "/" + username, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400){
	    alert("successfully added!");
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

GameFinder.prototype.search = function() {
	var gamefinder = this;
	var nameQuery = this.input.value;
	if (nameQuery == "") {
		this.errorMsg.innerHTML = "Enter a game name to search."
		this.errorMsg.style.display = 'block';
		this.table.style.display = 'none';
		return;
	}
	var request = new XMLHttpRequest();
	request.open('GET', '/gamefinder/' + nameQuery, true);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			data_array = JSON.parse(request.responseText);
			if (data_array.length == 0) {
				gamefinder.errorMsg.innerHTML = "There are no games with that name."
				gamefinder.errorMsg.style.display = 'block';
				gamefinder.table.style.display = 'none';
			} else {
				gamefinder.errorMsg.style.display = 'none';
				gamefinder.table.style.display = 'table';
				gamefinder.createHeaderRow();
				data_array.forEach(function(data, i){
					// Game Name
					var row = document.createElement("tr");
					var nameTd = document.createElement("td");
					nameTd.innerHTML = data.name;
					row.appendChild(nameTd);

					// Join 
					var buttonTd = document.createElement("td");
					var button = document.createElement("button");
					button.innerHTML = "Join";
					button.type = "button";
					button.className = "btn btn-primary";
					button.addEventListener("click", function(){
						gamefinder.joinGame(data.name, localStorage.username);
					});
					buttonTd.appendChild(button);
					row.appendChild(buttonTd);
					gamefinder.tbody.appendChild(row);
				});
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