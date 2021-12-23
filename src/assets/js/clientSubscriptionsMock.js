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

    let arr = [];

    for (let i in clientSubscriptions) {
        if (clientSubscriptions[i]['name'] === input) {
            arr.push(clientSubscriptions[i]);
        } else if (clientSubscriptions[i]['lastname'] === input) {
            arr.push(clientSubscriptions[i]);
        } else if (clientSubscriptions[i]['phone'] === input) {
            arr.push(clientSubscriptions[i])
        } else if (clientSubscriptions[i]['mars_id'] === input) {
            arr.push(clientSubscriptions[i])
        }
    }

    return loadClientSubscriptions();
}

function refreshFilter(e) {
    e.preventDefault();
    loadClientSubscriptions();
}

function getData() {
    fetchFromServer(`https://project-ii.ti.howest.be/mars-16/api/clients`, 'GET',)
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
        let userlatitude = DATA[i].location.latitude.toFixed(4)
        let userlongitude = DATA[i].location.longitude.toFixed(4)
        console.log(DATA[i].subscription);
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