"use scrict"

document.addEventListener("DOMContentLoaded", init);

let amountOfVehicles = 0;

function init() {
    getData();
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["amount of vehicles", "amount of busy vehicles", "amount of non busy vehicles"],
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
        }
    });

    function getData() {
        fetchFromServer(`https://project-ii.ti.howest.be/mars-16/api/vehicles`, 'GET',)
            .then(response => {
                    setData(response.vehicles)
                }
            );
    }
    function setData(response){
        amountOfVehicles = response.length;
        let amountOfNonBusyVehicles = 0;
        for (let i = 0; i<response.length;i++){
            if (response[i].occupied===false){
                amountOfNonBusyVehicles += 1;
            }
        }
        const amountOfBusyVehicles = amountOfVehicles - amountOfNonBusyVehicles;
        addData(myChart, [amountOfVehicles, amountOfBusyVehicles, amountOfNonBusyVehicles], 0);
    }
    function addData(chart, data, datasetIndex) {
        chart.data.datasets[datasetIndex].data = data;
        chart.update();
        changeScaleDynamically(chart);
    }

    function changeScaleDynamically(chart) {
        chart.options = {
            scales: {
                y: {
                    ticks: {
                        stepSize: 1,
                        beginAtZero: true
                    },
                    max: amountOfVehicles + 5
                }
            }
        };
        chart.update();
    }

}



