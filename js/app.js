// define all the variables needed


let input = document.querySelector(".button")
let ipValue = document.querySelector(".input")
let ip = document.querySelector(".IP")
let locationDiv = document.querySelector(".location")
let timezone = document.querySelector(".timezone")
let isp = document.querySelector(".ISP")
// let API = {
//     method: 'GET',
//     apiKey: 'at_D5L29e3xkAVO3jrfYsGRhGIc61ynv'
// }
let api_key = 'at_D5L29e3xkAVO3jrfYsGRhGIc61ynv'

function eventHandler () {
    $(function () {
        $.ajax({
            url: "https://geo.ipify.org/api/v1",
            data: {apiKey: api_key, ipAddress: ipValue.value},
            success: function(data) {
                let usefulData = [data.ip, [data.location.city,data.location.country], data.location.timezone, data.isp, data.location.lat, data.location.lng];
                dataHandler(usefulData)
            }
        });
     });
    // fetch('https://geo.ipify.org/api/v1', API).then(res => res.json()).then(data => console.log(data))
}

function dataHandler (arr) {
    // append the data from the array to the div
    ip.innerHTML = arr[0];
    locationDiv.innerHTML = `${arr[1][0]}, ${arr[1][1]}`;
    timezone.innerHTML = arr[2];
    isp.innerHTML = arr[3];
}

input.addEventListener('click', eventHandler)