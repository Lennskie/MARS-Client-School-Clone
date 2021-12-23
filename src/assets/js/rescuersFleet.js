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
    let arr = [];
    let filter;

    if (e.target.classList.contains('activeFilter')) {
        arr.push(e.target);
        removeActiveFilters(arr);
        return loadRescuersfleetGrid(rescuersFleet);
    }
    else if (e.target.id === 'filterDispatch') {
        e.target.classList.add('activeFilter');
        arr.push(document.querySelector('#filterStandby'), document.querySelector('#filterNonOperational'));
        filter = 'Dispatched';
    }
    else if(e.target.id === 'filterStandby') {
        e.target.classList.add('activeFilter')
        arr.push(document.querySelector('#filterDispatch'), document.querySelector('#filterNonOperational'));
        filter = 'Standby';
    }
    else if (e.target.id === 'filterNonOperational') {
        e.target.classList.add('activeFilter')
        arr.push(document.querySelector('#filterDispatch'), document.querySelector('#filterStandby'));
        filter = 'Repairing';
    }

    removeActiveFilters(arr);
    return rescuersGridFilter(filter);
}

function removeActiveFilters(array) {
    for (let i in array) {
        array[i].classList.remove('activeFilter')
    }
}

function rescuersGridFilter(filterOn) {
    let arr = [];

    for (let i in rescuersFleet) {
        if(rescuersFleet[i]['status'] === filterOn) {
            arr.push(rescuersFleet[i]);
        }
    }

    return loadRescuersfleetGrid(arr);
}

function getData() {
    fetchFromServer(`https://project-ii.ti.howest.be/mars-16/api/vehicles`, 'GET',)
        .then(response => {
            loadRescuersfleetGrid(response)
            }
        );
}

function loadRescuersfleetGrid(DATA) {
    DATA = DATA.vehicles;
    let temp = rescuersFleet;
    const parent = document.querySelector(".rescuersfleetGrid");

    parent.innerHTML = ''; //reset the HTML

    for (let  i=0; i < DATA.length; i++){
            parent.insertAdjacentHTML('beforeend', `
        <div>
            <p>${DATA[i].identifier}</p>
        </div>
        <div>
            <p>working</p>
        </div>
        <div>
            <p>${DATA[i].occupied}</p>
        </div>
        <div>
            <p>${temp[i].status}</p>
        </div>
        <div>
            <p>${temp[i].rescue_eta}<p>
        </div>  
        <div>
            <p>${temp[i].actual_position}</p>
        </div>
        <div>
            <p>${temp[i].final_destination}<p>
        </div>
            `)
        }
}

function goToChart(){
    window.location.assign("chartvehicles.html");
}