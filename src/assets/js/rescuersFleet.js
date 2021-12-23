"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    getData();
    document.querySelectorAll('.rescuersfleetPanel .filter button').forEach(el => el.addEventListener('click', changeFilter));
    document.querySelector('#getChart').removeEventListener('click',changeFilter);
    document.querySelector('#getChart').addEventListener('click',goToChart)
}

function changeFilter(e) {
    e.preventDefault();
    let buttonData = e.target.dataset.buttondata;
    e.target.className.add("active");
    getDataForFilter(buttonData)
}

function getDataForFilter(buttonData){
        fetchFromServer(`http://localhost:8080/api/dispatches`, 'GET',)
            .then(response => {
                    filterOnButtonData(response, buttonData)
                }
            );
}

function filterOnButtonData(DATA, buttonDATA){
    DATA = DATA.dispatches;
    console.log(DATA)
    console.log(buttonDATA)

    const parent = document.querySelector(".rescuersfleetGrid");
    parent.innerHTML = ''; //reset the HTML

    for (let  i=0; i < DATA.length; i++) {

        let sourceLocation = DATA[i].source.location.latitude + " ; " + DATA[i].source.location.longitude;
        let destinationLocation = DATA[i].destination.location.latitude + " ; " + DATA[i].destination.location.longitude;

        if (DATA[i].source.identifier.includes(buttonDATA) ||  DATA[i].destination.identifier.includes(buttonDATA)) {
            parent.insertAdjacentHTML('beforeend', `
        <div data-identifier="${DATA[i].identifier}">
            <p>${DATA[i].source.identifier}</p>
        </div>
        <div data-identifier="${DATA[i].identifier}">
            <p>${DATA[i].destination.identifier}</p>
        </div>
        <div data-identifier="${DATA[i].identifier}">
            <p>operational</p>
        </div>
        <div data-identifier="${DATA[i].identifier}">
            <p>2 minutes</p>
        </div>
        <div data-identifier="${DATA[i].identifier}">
            <p>${sourceLocation}<p>
        </div>  
        <div data-identifier="${DATA[i].identifier}">
            <p>${sourceLocation}<p>
        </div>  
        <div data-identifier="${DATA[i].identifier}">
            <p>${destinationLocation}<p>
        </div>
            `)
        }
    }
}

function getData() {
    fetchFromServer(`http://localhost:8080/api/dispatches`, 'GET',)
        .then(response => {
            loadRescuersfleetGrid(response)
            }
        );
}

function loadRescuersfleetGrid(DATA) {
    DATA = DATA.dispatches;
    const parent = document.querySelector(".rescuersfleetGrid");

    parent.innerHTML = ''; //reset the HTML

    for (let  i=0; i < DATA.length; i++){

        let sourceLocation = DATA[i].source.location.latitude + " ; " + DATA[i].source.location.longitude;
        let destinationLocation = DATA[i].destination.location.latitude + " ; " + DATA[i].destination.location.longitude;

            parent.insertAdjacentHTML('beforeend', `
        <div data-identifier="${DATA[i].identifier}">
            <p>${DATA[i].source.identifier}</p>
        </div>
        <div data-identifier="${DATA[i].identifier}">
            <p>${DATA[i].destination.identifier}</p>
        </div>
        <div data-identifier="${DATA[i].identifier}">
            <p>operational</p>
        </div>
        <div data-identifier="${DATA[i].identifier}">
            <p>2 minutes</p>
        </div>
        <div data-identifier="${DATA[i].identifier}">
            <p>${sourceLocation}<p>
        </div>  
        <div data-identifier="${DATA[i].identifier}">
            <p>${sourceLocation}<p>
        </div>  
        <div data-identifier="${DATA[i].identifier}">
            <p>${destinationLocation}<p>
        </div>
            `)
        }
}

function goToChart(){
    window.location.assign("chartvehicles.html");
}