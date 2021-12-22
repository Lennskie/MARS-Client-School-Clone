"use scrict"

document.addEventListener("DOMContentLoaded", init);
let amountOfVehicles

function init() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["amount of vehicles", "amount of operational vehicles", "amount of non operational vehicles"],
            datasets: [{
                label: "",
                data: [],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 255, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 255, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks: {
                        stepSize: 1,
                        beginAtZero: true
                    },
                    max: 20
                }
            }
        }
    });
    getData();
    setTimeout(function() {
        const amountOfOperationalVehicles = countAmountOfOperational();
        const amountOfNonOperationalVehicles = amountOfVehicles - amountOfOperationalVehicles;
        addData(myChart, [amountOfVehicles, amountOfOperationalVehicles, amountOfNonOperationalVehicles], 0);
    }, 1000);
    function addData(chart, data, datasetIndex) {
        chart.data.datasets[datasetIndex].data = data;
        chart.update();
    }
}

function getData() {
    fetchFromServer(`https://project-ii.ti.howest.be/mars-16/api/vehicles`, 'GET',)
        .then(function(response){
            amountOfVehicles = response.vehicles.length; //todo: add more vehicles in the server
        });
}

function countAmountOfOperational(){
    let operationalVehicles = 0;
    for (let i = 0;i<rescuersFleet.length; i++){
        if (rescuersFleet[i].condition === "Operational"){
            operationalVehicles += 1;
        }
    }
    return operationalVehicles
}
