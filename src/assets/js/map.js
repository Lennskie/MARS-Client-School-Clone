const earthMap = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
const earthSatellite = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

// Global variable to access the map from external code
let mymap;

// Connections helper values
let fromvehicle;
let toclient;

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
}

function addDomeToMap(location, domeId) {

	let dome = L.marker([location[0], location[1]], {
		icon: icons.surfaceColony,
		opacity: 0.5
	})
		.addTo(mymap);

	dome.id = domeId;
	domes.set(domeId, dome);
}

function addVehicleToMap(location, vehicleId) {

	let vehicle = L.marker([location[0], location[1]], { icon: icons.vehicle })
		.bindPopup(`<button onclick="routeFrom(${vehicleId})">Dispatch</button>`)
		.addTo(mymap);

	vehicle.id = vehicleId;
	vehicle.isOccupied = false;
	vehicles.set(vehicleId, vehicle);
}

function addClientToMap(vitalStatus, location, clientId) {

	let clientIcon = icons.client[vitalStatus] || icons.client['healthy'];

	let client = L.marker([location[0], location[1]], { icon: clientIcon })
		.bindPopup(`<button onclick="routeTo(${clientId})">Save</button>`)
		.addTo(mymap);
	
	client.status = vitalStatus;
	client.id = clientId;
	client.isBeingTransported = false;

	clients.set(clientId, client);
}

function routeFrom(vehicleId) {
	fromvehicle = vehicleId;
	drawVehicleClientRoute();
}

function routeTo(clientId) {
	toclient = clientId;
	drawVehicleClientRoute();
}

function drawVehicleClientRoute() {
	if (fromvehicle !== undefined && toclient !== undefined && fromvehicle !== null && toclient !== null) {

		const id = fromvehicle;

		var pointList = [vehicles.get(fromvehicle)._latlng, clients.get(toclient)._latlng];

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
		vehicleClientConnections.set(id, clientVehicleConnection);

		drawClientDomeRoute();

		fromvehicle = null;
		toclient = null;
	}
}

function drawClientDomeRoute() {
	const destination = findNearestDome(toclient);

	var pointList = [clients.get(toclient)._latlng, destination._latlng];

	let clientDomeConnection = new L.polyline(pointList, connectionStyles.clientDome);

	clientDomeConnection.addTo(mymap);
	clientDomeConnections.set(toclient, clientDomeConnection);

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

	return Math.sqrt(Math.pow((xa-xb), 2) + Math.pow((ya-yb), 2));
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
	.bindPopup(`<button onclick="routeFrom(${vehicleId})">Dispatch</button>`);
}

function removeDomeConnection(connectionId) {
	mymap.removeLayer(clientDomeConnections.get(connectionId));
	clientDomeConnections.delete(connectionId);
}

function enableClientInteraction(clientId) {

	clients.get(clientId).bindPopup(`<button onclick="routeTo(${clientId})">Save</button>`);

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
			let nearestVehicleId = Array.from(vehicles.keys()).find(key => vehicles.get(key)===nearestVehicle);

			routeFrom(nearestVehicleId);
			routeTo(clientId);
		})
	})
}


// Can be removed once this data is fetched from the server
function generateRandomLocation() {
	// All magical constants in this code are present
	// To limit the generated coordinates to the rough area of the standard map viewport.
    let x = Math.random() * (9 - 0) + 0;
    let y = Math.random() * (59 - 0) + 0;

    x = x * 0.002
    y = y * 0.001

    const xpos = 29.62295 + x;
    const ypos = 35.40 + y;

    return [xpos, ypos]
}