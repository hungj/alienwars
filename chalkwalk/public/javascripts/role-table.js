function RoleTable(tbodyId, gameName) {
	this.tbody = document.getElementById(tbodyId);
	this.gameName = gameName;
}

RoleTable.prototype.createHeaderRows = function() {
	var headRow = document.createElement("tr");
	var nameHeader = document.createElement("th");
	nameHeader.innerHTML = "Name";
	var roleHeader = document.createElement("th");
	roleHeader.innerHTML = "Role";
	headRow.appendChild(nameHeader);
	headRow.appendChild(roleHeader);
	this.tbody.appendChild(headRow);
}

RoleTable.prototype.addUserToTable = function(name, roleData) {
	var row = document.createElement("tr");
	var nameData = document.createElement("td");
	nameData.innerHTML = name;
	var roleData = document.createElement("td");
	roleData.innerHTML = "Drawer";
	row.appendChild(nameData);
	row.appendChild(roleData);
	this.tbody.appendChild(row);

	userRoleMap[name] = roleData;
}

RoleTable.prototype.welcomeNewUser = function() {
	this.createHeaderRows();
	var fb = new Firebase('https://outdoorspictionary.firebaseIO.com/Games/' + this.gameName + '/users');
	fb.push({'name':localStorage.username});
}