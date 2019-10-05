function getCoords(position) {
    var coords = position.coords;
    return coords;
}

function getPosition() {
    let longitud;
    let latitud;
    let currentCoords;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');


    if  (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            currentCoords = getCoords(position);
            latitud = currentCoords.latitude;
            longitud = currentCoords.longitude;
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const API = `${proxy}https://api.darksky.net/forecast/ed4229c2097b544b6c52b1366c76a49b/${latitud},${longitud}`;
            fetch(API)
                .then(Response => {
                    return Response.json();
                })
                .then(data => {
                    const {temperature, summary, icon}= data.currently;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimeZone.textContent = data.timezone;

                    let celsius = (temperature-32) * (5/9);

                    setIcons(icon,document.querySelector(".icon"));

                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "F"){
                           temperatureSpan.textContent = "C";
                           temperatureDegree.textContent = Math.floor(celsius);
                        }else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                });
        });
    }else {
        h1.textContent = "Your browser cant run geolocation"; 
    }

     function setIcons(icon, iconId) {
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);


     }


}
window.addEventListener('load', getPosition());