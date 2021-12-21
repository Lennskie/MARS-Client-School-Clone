"use scrict"

document.addEventListener("DOMContentLoaded", init);

const amountOfVehicles = rescuersFleet.length;
const amountOfOperationalVehicles = countAmountOfOperational();
const amountOfNonOperationalVehicles = amountOfVehicles - amountOfOperationalVehicles

function init(){
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["amount of vehicles","amount of operational vehicles", "amount of non operational vehicles"],
            datasets: [{
                label: "",
                data: [amountOfVehicles, amountOfOperationalVehicles, amountOfNonOperationalVehicles],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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
                    max: amountOfVehicles + 5
                }
            }
        }
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
