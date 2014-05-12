function SearchResultsTable(id, inputId) {
  this.table = document.getElementById(id);
  this.input = document.getElementById(inputId);
}

SearchResultsTable.prototype.empty = function() {
	this.table.innerHTML = "";
}

SearchResultsTable.prototype.populate = function(fb) {
	var gameNameQuery = this.input.value;
	if (gameNameQuery != "") {
		this.empty();

		var tbody = document.createElement("tbody");
		var trow = document.createElement("tr");
		var th1 = document.createElement("th");
		th1.innerHTML = "Game Name";
		var th2 = document.createElement("th");
		th2.innerHTML = "# of Players";
		var th3 = document.createElement("th");
		th3.innerHTML = "Join?";
		trow.appendChild(th1);
		trow.appendChild(th2);
		trow.appendChild(th3);
		tbody.appendChild(trow);

		fb.child('Games').once('value', function(gamesSnapshot){
			var games = gamesSnapshot.val();
			for (var game in games) {
				var row = document.createElement("tr");
				
				var name = document.createElement("td");
				name.innerHTML = games[game].name;
				row.appendChild(name);

				var numPeople = document.createElement("td");
				numPeople.innerHTML = 2048;
				row.appendChild(numPeople);
				
				var join = document.createElement("td");
				var joinBtn = document.createElement("button");
				joinBtn.type = "button";
				joinBtn.className = "btn btn-info";
				joinBtn.innerHTML = "Join";
				joinBtn.addEventListener("click", function(){
					window.location = "picture.html";
				});
				join.appendChild(joinBtn);
				row.appendChild(join);
				tbody.appendChild(row);
			}
		});
		this.table.appendChild(tbody);
	} else {
		alert("Game name can't be empty");
	}
}