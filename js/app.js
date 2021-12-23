// define all the variables needed


let input = document.querySelector(".button")
let ipValue = document.querySelector(".input")
let ip = document.querySelector(".IP")
let locationDiv = document.querySelector(".location")
let timezone = document.querySelector(".timezone")
let isp = document.querySelector(".ISP")
let mapDiv = document.querySelector(".map")
let icon = document.querySelector("i")
// let API = {
//     method: 'GET',
//     apiKey: 'at_D5L29e3xkAVO3jrfYsGRhGIc61ynv'
// }
let api_key = 'at_D5L29e3xkAVO3jrfYsGRhGIc61ynv'


function eventHandler () {
    // console.log(typeof ip.value)
    if (ipValue.value.length == 13) {
        $(function () {
            $.ajax({
                url: "https://geo.ipify.org/api/v1",
                data: {apiKey: api_key, ipAddress: ipValue.value},
                success: function(data) {
                    let usefulData = [data.ip, [data.location.city,data.location.country], data.location.timezone, data.isp, data.location.lat, data.location.lng];
                    dataHandler(usefulData)
                    mapRender(usefulData[4],usefulData[5])
                }
            });
         });
        // fetch('https://geo.ipify.org/api/v1', API).then(res => res.json()).then(data => console.log(data))
    } else {
        icon.classList.remove("hidden")
    }
  
}

function dataHandler (arr) {
    // append the data from the array to the div
    ip.innerHTML = arr[0];
    locationDiv.innerHTML = `${arr[1][0]}, ${arr[1][1]}`;
    timezone.innerHTML = arr[2];
    isp.innerHTML = arr[3];
}

function mapRender (lat, lng) {

    let map = L.map('map').setView([lat, lng], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoia3Fpbm5laCIsImEiOiJja3hpdThya2MybjNoMndwZzhybHBmY25wIn0.xxD79YvCI6D0fy_tUWNnNQ'
    }).addTo(map);
    let marker = L.marker([lat, lng]).addTo(map);
}

input.addEventListener('click', eventHandler)