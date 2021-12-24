"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    getData();
    document.querySelectorAll('.clientSubscriptions .filter button').forEach(el => el.addEventListener('click', searchFilter));
    document.querySelectorAll('.clientSubscriptions .filter img').forEach(el => el.addEventListener('click', refreshFilter));
}

function searchFilter(e) {
    e.preventDefault();
    const input = document.querySelector('.clientSubscriptions form input[type="text"]').value
    getSingularData(input);
}

function displayFilteredResult(response){
    const parent = document.querySelector(".clientSubscriptionsGrid");
    parent.innerHTML = ''; //reset the HTML
    let userlatitude = response.location.latitude.toFixed(4)
    let userlongitude = response.location.longitude.toFixed(4)
    if ( response.subscription === null || response.subscription.reimbursed === false) {
        parent.insertAdjacentHTML('beforeend', `
    <div>
        <p>${response.identifier}</p>
    </div>
    <div>
        <p>${response.firstname}</p>
    </div>
    <div>
        <p>${response.lastname}</p>
    </div>
    <div>
        <p>Not subscribed</p>
    </div>
    <div>
        <p>Not subscribed</p>
    </div>
    <div>
        <p>Not subscribed</p>
    </div>
    <div>
        <p>Not subscribed</p>
    </div>
        `)
    } else {
        parent.insertAdjacentHTML('beforeend', `
    <div>
        <p>${response.identifier}</p>
    </div>
    <div>
        <p>${response.firstname}</p>
    </div>
    <div>
        <p>${response.lastname}</p>
    </div>
    <div>
        <p>${response.subscription.name}</p>
    </div>
    <div>
        <p>${response.subscription.reimbursed}</p>
    </div>
    <div>
        <p>${userlatitude}; ${userlongitude}</p>
    </div>
    <div>
        <p>${response.vitals}</p>
    </div>
        `)
    }
}

function refreshFilter(e) {
    e.preventDefault();
    getData();
}

function getSingularData(input) {
    fetchFromServer(configuration.api.url + `/clients/${input}`, 'GET',)
        .then(response => {
            displayFilteredResult(response)
            }
        );
}

function getData() {
    fetchFromServer(configuration.api.url + "/clients", 'GET',)
        .then(response => {
                loadClientSubscriptions(response)
            }
        );
}

function loadClientSubscriptions(DATA) {
    DATA = DATA.clients;
    const parent = document.querySelector(".clientSubscriptionsGrid");

    parent.innerHTML = ''; //reset the HTML

    for (let  i=0; i < DATA.length; i++){
        let userlatitude = DATA[i].location.latitude.toFixed(4);
        let userlongitude = DATA[i].location.longitude.toFixed(4);
        if ( (DATA[i].subscription === null || DATA[i].subscription.reimbursed === false) ) {
            parent.insertAdjacentHTML('beforeend', `
        <div>
            <p>${DATA[i].identifier}</p>
        </div>
        <div>
            <p>${DATA[i].firstname}</p>
        </div>
        <div>
            <p>${DATA[i].lastname}</p>
        </div>
        <div>
            <p>Not subscribed</p>
        </div>
        <div>
            <p>Not subscribed</p>
        </div>
        <div>
            <p>Not subscribed</p>
        </div>
        <div>
            <p>Not subscribed</p>
        </div>
            `)
        } else {
            parent.insertAdjacentHTML('beforeend', `
        <div>
            <p>${DATA[i].identifier}</p>
        </div>
        <div>
            <p>${DATA[i].firstname}</p>
        </div>
        <div>
            <p>${DATA[i].lastname}</p>
        </div>
        <div>
            <p>${DATA[i].subscription.name}</p>
        </div>
        <div>
            <p>${DATA[i].subscription.reimbursed}</p>
        </div>
        <div>
            <p>${userlatitude}; ${userlongitude}</p>
        </div>
        <div>
            <p>${DATA[i].vitals}</p>
        </div>
            `)
        }
        }
}