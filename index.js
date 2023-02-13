const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const API_KEY = '728b0ee6df5687559812bd3169ad77b7';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '450px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                notFound.style.display = 'block';
                notFound.classList.add('fadeIn');
                return;
            }

            notFound.style.display = 'none';
            notFound.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {

                case 'Clear':
                    image.src = 'https://img.icons8.com/color/96/000000/sun.png';
                    break;

                case 'Rain':
                    image.src = 'https://img.icons8.com/color/96/000000/rain.png';
                    break;

                case 'Snow':
                    image.src = 'https://img.icons8.com/color/96/000000/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'https://img.icons8.com/color/96/000000/clouds.png';
                    break;

                case 'Haze':
                    image.src = 'https://img.icons8.com/color/96/000000/mist.png';
                    break;


                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});