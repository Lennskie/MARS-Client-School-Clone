"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    loadRescuersfleetGrid(rescuersFleetDataMock);
    document.querySelectorAll('.rescuersfleetPanel .filter button').forEach(el => el.addEventListener('click', changeFilter));
}

function changeFilter(e) {
    e.preventDefault();
    let arr = [];
    let filter;

    if(e.target.id === 'filterDispatch') {
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

    for (let i in rescuersFleetDataMock) {
        if(rescuersFleetDataMock[i]['status'] === filterOn) {
            arr.push(rescuersFleetDataMock[i]);
        }
    }

    return loadRescuersfleetGrid(arr);
}

function loadRescuersfleetGrid(data) {
    const parent = document.querySelector(".rescuersfleetGrid");
    parent.innerHTML = '';

    data.forEach((listitem)=> {
        parent.insertAdjacentHTML('beforeend', `
            <div>
                <p>${listitem['vehicle_id']}</p>
            </div>
            <div>
                <p>${listitem['condition']}</p>
            </div>
            <div>
                <p>${listitem['status']}</p>
            </div>
            <div>
                <p>${listitem['rescue_eta']}</p>
            </div>
            <div>
                <p>${listitem['base']}</p>
            </div>
            <div>
                <p>${listitem['actual_position']}</p>
            </div>
            <div>
                <p>${listitem['final_destination']}</p>
            </div>
        `)
    })
}