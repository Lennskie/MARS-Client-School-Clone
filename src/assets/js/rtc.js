"use strict";

let eb;

function eventBusStart() {
    eb = new EventBus(configuration.eventbus.url);

    eb.onopen = () => {
        eb.registerHandler('new.client', handleNewClient);
        eb.registerHandler('new.vehicle', handleNewVehicle);
        eb.registerHandler('new.dispatch', handleNewDipsatch);
        eb.registerHandler('delete.dipsatch', handleDeletedDipspatch);
        eb.registerHandler('location.client', handleClientLocationUpdate);
        eb.registerHandler('location.vehicle', handleVehicleLocationUpdate);
    }

    // Logs closing of busses, shouldn't actaully occur during runtime but might be 
    // usefull to show some sort of "Loading/something went wrong" message
    eb.onclose = (param) => {
        console.log('closed: ', param);
    }
}

function handleNewClient(error, message) {
    if (!error) {
        addClientToMap(message.body.vitals.status, message.body.location, message.body.identifier);
    } else {
        console.log('NewClient Error: ', error);
    }
}

function handleNewVehicle(error, message) {
    if (!error) {
        addVehicleToMap(message.body.location, message.body.identifier);
    } else {
        console.log('NewVehicle Error: ', error);
    }


}

function handleNewDipsatch(error, message) {
    if (!error) {
        vehicleClientConnections.forEach(connection => {
            mymap.removeLayer(connection);
        });
    
        clientDomeConnections.forEach(connection => {
            mymap.removeLayer(connection);
        });

        fetchNewDispatches();
    }

}

function handleDeletedDipspatch() {
    // Placeholder
}

function handleClientLocationUpdate(error, message) {
    let newLocation = new L.LatLng(message.body.location.latitude, message.body.location.longitude);
    clients.get(message.body.identifier).setLatLng(newLocation);

}

function handleVehicleLocationUpdate(error, message) {
    let newLocation = new L.LatLng(message.body.location.latitude, message.body.location.longitude);
    vehicles.get(message.body.identifier).setLatLng(newLocation);
}

function fetchNewDispatches() {

    fetch(configuration.api.url + "/dispatches")
    .then(response => response.json())
    .then(data => drawNewDispatches(data));

}

function drawNewDispatches(data) {
    const dispatches = data.dispatches;
    dispatches.forEach(dispatch => {
        drawVehicleClientRoute();
    });
}