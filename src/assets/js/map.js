const earthMap = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
const earthSatellite = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

// Global variable to access the map from external code
let mymap;

// Connections helper values
let fromvehicle;
let toclient;
let toDome;

const connectionStyles = {
	vehicleClient: {
		color: 'red',
		weight: 3,
		opacity: 1
	},
	clientDome: {
		color: 'blue',
		weight: 3,
		opacity: 1
	}
}

// Global variable to work with drawn vehicle-client routes
let vehicleClientConnections = new Map();

// Global variable to work with drawn vehicle-dome routes
let clientDomeConnections = new Map();

// Global variable to work with displayed domes
let domes = new Map();

// Global variable to work with displayed clients
let clients = new Map();

// Global variable to work with displayed vehicles
let vehicles = new Map();

// Issue that cannot be fixed in a "pretty" way in time, sorry
let dump = new Array();

// Icons for leaflet

const icons = {
	// "Dome"
	surfaceColony: new L.Icon({
		iconUrl: 'assets/images/planet.png',
		iconSize: [128, 128],
		iconAnchor: [64, 64],
		popupAnchor: [0, -64],
	}),
	client: {
		// red
		critical: new L.Icon({
			iconUrl: 'assets/images/reddot.png',
			iconSize: [16, 16],
			iconAnchor: [8, 8],
			popupAnchor: [0, -8]
		}),
		// orange
		medium: new L.Icon({
			iconUrl: 'assets/images/orangedot.png',
			iconSize: [16, 16],
			iconAnchor: [8, 8],
			popupAnchor: [0, -8]
		}),
		// green
		healthy: new L.Icon({
			iconUrl: 'assets/images/greendot.png',
			iconSize: [16, 16],
			iconAnchor: [8, 8],
			popupAnchor: [0, -8]
		})
	},
	vehicle: new L.Icon({
		iconUrl: 'assets/images/vehicle.png',
		iconSize: [64, 64],
		iconAnchor: [32, 32],
		popupAnchor: [0, -32]
	})
};

document.addEventListener("DOMContentLoaded", init);

function init() {
	drawMap();
}


/* MAPS */

function drawMap() {
	mymap = L.map('map').setView([29.633333, 35.433333], 13);

	L.tileLayer(earthSatellite, {
		minZoom: 15,
		maxZoom: 16,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);

	mapDrawn();
}

function mapDrawn() {
	// Here comes the logic that requires a map to be present
	// This would be for example getting the eventbus and listeners started
	startLogic();
}

function addDagnerzoneToMap(location, diameter) {
	let zone = L.circle([location.latitude, location.longitude], {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5,
		radius: diameter
	}).addTo(mymap);
}

function addDomeToMap(location, domeId) {

	let dome = L.marker([location.latitude, location.longitude], {
		icon: icons.surfaceColony,
		opacity: 0.5
	})
		.addTo(mymap);

	dome.id = domeId;
	domes.set(domeId, dome);
}

function addVehicleToMap(newVehicle) {

	let location = newVehicle.location;
	let vehicleId = newVehicle.identifier;

	let vehicle = L.marker([location.latitude, location.longitude], { icon: icons.vehicle })
		.bindPopup(`<button onclick="routeFrom('${vehicleId}')">Dispatch</button>`)
		.addTo(mymap);

	vehicle.id = vehicleId;
	vehicle.isOccupied = false;
	vehicles.set(vehicleId, vehicle);
	console.log('adding vehicle');
}

function addClientToMap(vitalStatus, location, clientId) {

	let clientIcon = icons.client[vitalStatus] || icons.client['healthy'];

	let client = L.marker([location.latitude, location.longitude], { icon: clientIcon })
		.bindPopup(`<button onclick="routeTo('${clientId}')">Save</button>`)
		.addTo(mymap);

	client.status = vitalStatus;
	client.id = clientId;
	client.isBeingTransported = false;

	clients.set(clientId, client);
	console.log('adding client');
}

function routeFrom(vehicleId) {
	fromvehicle = vehicleId;
	drawVehicleClientRoute();
}

function routeTo(clientId) {
	toclient = clientId;
	drawVehicleClientRoute();
}

function addDispatchToMap() {
	// Boilerplate
}

function drawVehicleClientRoute(source = null, destination = null) {
	if (source === null && destination === null) {
		if (fromvehicle !== undefined && toclient !== undefined && fromvehicle !== null && toclient !== null) {

			const id = fromvehicle;

			let pointList = [vehicles.get(fromvehicle)._latlng, clients.get(toclient)._latlng];

			// Clients and Vehicles that are in an active response should no longer be
			// be able to be dispached/saved again.
			const vehicle = vehicles.get(fromvehicle);

			vehicle.unbindPopup()
				.bindPopup(`<div>Occupied</div>`);

			vehicle.isOccupied = true;

			const client = clients.get(toclient);
			client.unbindPopup();

			client.isBeingTransported = true;

			let clientVehicleConnection = new L.polyline(pointList, connectionStyles.vehicleClient);

			clientVehicleConnection.addTo(mymap);
			dump.push(clientVehicleConnection);
			vehicleClientConnections.set(id, clientVehicleConnection);

			drawClientDomeRoute();

			const firstDispatchObj = {
				'identifier': getRandomIntBetween(0, 100000).toString(),
				'source_type': 'Vehicle',
				'destination_type': 'Client',
				'source_identifier': fromvehicle.toString(),
				'destination_identifier': toclient.toString()
			}

			const secondDispatchObj = {
				'identifier': getRandomIntBetween(0, 100000).toString(),
				'source_type': 'Client',
				'destination_type': 'Dome',
				'source_identifier': toclient.toString(),
				'destination_identifier': toDome.id.toString()
			}

			fetch(configuration.api.url + "/dispatch/create", {
				method: 'POST',
				headers: {
					'Content-type': 'application/json;',
				},
				body: JSON.stringify(firstDispatchObj),
			})
			.then(response => response.json())
			.then(data => console.log(data));

			fetch(configuration.api.url + "/dispatch/create", {
				method: 'POST',
				headers: {
					'Content-type': 'application/json;',
				},
				body: JSON.stringify(secondDispatchObj),
			})
			.then(response => response.json())
			.then(data => console.log(data));

			fromvehicle = null;
			toclient = null;
			toDome = null;
		}
	} else {
		// Instant delegation call
		const thisVehicleId = source.identifier;
		const thisClientId = destination.identifier;

		let pointList = [vehicles.get(thisVehicleId)._latlng, clients.get(thisClientId)._latlng];

		const vehicle = vehicles.get(thisVehicleId);

		vehicle.unbindPopup()
			.bindPopup(`<div>Occupied</div>`);

		vehicle.isOccupied = true;

		const client = clients.get(thisClientId);
		client.unbindPopup();

		client.isBeingTransported = true;

		let clientVehicleConnection = new L.polyline(pointList, connectionStyles.vehicleClient);

		clientVehicleConnection.addTo(mymap);
		dump.push(clientVehicleConnection);
		vehicleClientConnections.set(thisVehicleId, clientVehicleConnection);
	}
}

function drawClientDomeRoute(source = null, destination = null) {
	if (source === null && destination === null) {
		toDome = findNearestDome(toclient);

		let pointList = [clients.get(toclient)._latlng, toDome._latlng];

		let clientDomeConnection = new L.polyline(pointList, connectionStyles.clientDome);

		clientDomeConnection.addTo(mymap);
		clientDomeConnections.set(toclient, clientDomeConnection);
	} else {
		toDome = destination;

		let pointList = [clients.get(source.identifier)._latlng, domes.get(destination.identifier)._latlng];

		let clientDomeConnection = new L.polyline(pointList, connectionStyles.clientDome);

		clientDomeConnection.addTo(mymap);
		dump.push(clientDomeConnection);
		clientDomeConnections.set(source.identifier, clientDomeConnection);

	}

}

function findNearestDome(clientId) {

	const client = clients.get(clientId);

	let distanceDomeMap = new Map();

	domes.forEach(dome => {
		distanceDomeMap.set(computeDistance(client, dome), dome);
	});

	let shortestDistance = Math.min(...distanceDomeMap.keys());
	return (distanceDomeMap.get(shortestDistance));
}

function computeDistance(firstMapObject, secondMapObject) {

	let xa = firstMapObject._latlng.lat;
	let ya = firstMapObject._latlng.lng;

	let xb = secondMapObject._latlng.lat;
	let yb = secondMapObject._latlng.lng;

	return Math.sqrt(Math.pow((xa - xb), 2) + Math.pow((ya - yb), 2));
}

function findNearestVehicle(clientId) {

	const client = clients.get(clientId);

	let distanceVehicleMap = new Map();

	vehicles.forEach(vehicle => {

		if (vehicle.isOccupied !== true) {
			distanceVehicleMap.set(computeDistance(client, vehicle), vehicle);
		}

	});

	let shortestDistance = Math.min(...distanceVehicleMap.keys());
	return (distanceVehicleMap.get(shortestDistance));
}

function redeployVehicle(vehicleId) {

	mymap.removeLayer(vehicleClientConnections.get(vehicleId));
	vehicles.get(vehicleId).unbindPopup()
		.bindPopup(`<button onclick="routeFrom('${vehicleId}')">Dispatch</button>`);
}

function removeDomeConnection(connectionId) {
	mymap.removeLayer(clientDomeConnections.get(connectionId));
	clientDomeConnections.delete(connectionId);
}

function enableClientInteraction(clientId) {

	clients.get(clientId).bindPopup(`<button onclick="routeTo('${clientId}')">Save</button>`);

}

function clearActions() {

	Array.from(vehicleClientConnections.keys()).forEach(key => {
		redeployVehicle(key);
		vehicles.get(key).isOccupied = false;
		vehicleClientConnections.delete(key);
	});

	Array.from(clients.keys()).forEach(key => {
		enableClientInteraction(key);
		clients.get(key).isBeingTransported = false;
	});

	Array.from(clientDomeConnections.keys()).forEach(key => {
		removeDomeConnection(key);
	});

}

/* TABLES */

function generateClientsTable() {
	// We'll base us on the clients (Map) variable,
	// That one is being updated constantly
	// with accurate data

	let tableBody = document.querySelector("#clients-table > tbody");
	tableBody.innerHTML = null;

	Array.from(clients.keys()).forEach(clientId => {
		const currentClient = clients.get(clientId);

		let row = tableBody.insertRow();

		let idCell = row.insertCell();
		let locationCell = row.insertCell();
		let statusCell = row.insertCell();
		let actionCell = row.insertCell();

		idCell.innerHTML = `<span>${clientId}</span>`;
		locationCell.innerHTML = `<span>Latitude: ${currentClient._latlng.lat} Longitude: ${currentClient._latlng.lng}</span>`;
		statusCell.innerHTML = `<span>${currentClient.status}</span>`;

		let actionButton = document.createElement("button");
		actionButton.innerHTML = "Rescue with nearest vehicle";
		actionButton.name = "client-action-button";
		actionButton.dataset.clientId = clientId;

		actionCell.appendChild(actionButton);


		document.querySelector(`button[data-client-id="${clientId}"]`).addEventListener("click", function () {
			const nearestVehicle = findNearestVehicle(clientId);
			let nearestVehicleId = Array.from(vehicles.keys()).find(key => vehicles.get(key) === nearestVehicle);

			routeFrom(nearestVehicleId);
			routeTo(clientId);
		})
	})
}

function startLogic() {

	fetch(configuration.api.url + "/overview")
		.then(response => response.json())
		.then(data => drawFirstMapState(data));

}

function drawFirstMapState(data) {
	if (localStorage.getItem("auth") === "employee" && !(window.location.href.includes("clientsmap.html"))) {
		const InitialVehicles = data.vehicles;
		const InitialClients = data.clients;
		const InitialDomes = data.domes;
		const InitialDispatches = data.dispatches;
	
		console.log(InitialVehicles);
		console.log(InitialDomes);
		console.log(InitialClients);
		console.log(InitialDispatches);
	
		InitialVehicles.forEach(vehicle => {
			addVehicleToMap(vehicle);
		});
	
		InitialClients.forEach(client => {
			addClientToMap(client.vitals, client.location, client.identifier);
		});
	
		InitialDomes.forEach(dome => {
			addDomeToMap(dome.location, dome.identifier);
		});
	
		fetchNewDispatches();
		eventBusStart();
	} else {
		drawDangerZones();
	}
}

function drawDangerZones() {
	fetch(configuration.api.url + "/dangerzones")
	.then(response => response.json())
	.then(data => {
		data.dangerzones.forEach(dangerzone => {
			addDagnerzoneToMap(dangerzone.location, dangerzone.radius);
		})
	});
}












// SHOULD BE MOVED TO A util.js FILE
function keyGet(map, searchValue) {
	for (let [key, value] of map.entries()) {
	  if (value === searchValue)
		    return key;
	}
  }

  function getRandomIntBetween(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
  }