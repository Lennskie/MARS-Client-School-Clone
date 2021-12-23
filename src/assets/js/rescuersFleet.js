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