// let clima = "1b35099737005e0722290087c9df9280"; //
// let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`; //

const api = {
    key: '1b35099737005e0722290087c9df9280',
    url: `https://api.openweathermap.org/data/2.5/weather`
}

const card = document.getElementById('card');

const city = document.getElementById('city');
const date = document.getElementById('date');
const imgT = document.getElementById('imgT');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');
const humidity = document.getElementById('humidity')
const wind = document.getElementById('wind')

function updateImage(data){
    const temp = toCelcius(data.main.temp);
    let src = '../../assets/img/calor.png';
    if (temp < 26){
        src = '../../assets/img/tempmedia.png';
    } else if (temp < 18) {
        src = '../../assets/img/frio.png';
    }
    imgT.src = src;
}


async function search(query) {
    try{
        const response = await fetch (`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json();
        card.style.display = 'block';
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        date.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = `${toCelcius(data.main.temp)} °c`;
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelcius(data.main.temp_min)} °c / ${toCelcius(data.main.temp_max)} °c`;
        humidity.innerHTML = `Humedad ${data.main.humidity}%`;
        wind.innerHTML = `Velocidad del viento ${data.wind.speed}k/m`;
        updateImage(data);
        console.log(data);

    } catch(err) {
        console.log(err);
        alert('Hubo un Error')
    }
}

function toCelcius(kelvin) {
    return Math.round(kelvin - 273.15);
}


function onSubmit(event){
    event.preventDefault();
    search(searchbox.value);

}

const form = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');
form.addEventListener('submit', onSubmit, true);

