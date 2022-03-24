const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
  const { cityDetails, weatherDetails } = data;
  // consle.log(weatherDetails.WeatherIcon);
  console.log(weatherDetails);
  // console.log(cityDetails);
  let weather = weatherDetails[0];
  // console.log(weatherDetails.DailyForecasts[0].Temperature.Maximum.Value);
  console.log(cityDetails.EnglishName);
  console.log(weather.WeatherIcon);

  // update details templates
  details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            
            <span>&deg;c</span>
        </div>
    `;

  // updating the day and night and icon images
  // let timeSrc = weather.IsDay ? 'img/day.svg' : 'img/night.svg';
  // time.setAttribute('src', timeSrc);
  // console.log(timeSrc);

  let timeSrc = () => {
    let day = 'img/day.svg';
    let night = 'img/night.svg';
    if (weather.IsDay) {
      return day;
    } else {
      return night;
    }
  };
  time.setAttribute('src', timeSrc);
  console.log('icon', timeSrc());
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  console.log(iconSrc);

  icon.setAttribute('src', iconSrc);

  // changing the display to visible
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weatherDetails = await getWeather(cityDetails.Key);

  return { cityDetails, weatherDetails };
};

cityForm.addEventListener('submit', (e) => {
  // set default action
  e.preventDefault();

  // get city value
  const cityValue = document.getElementById('city').value.trim();
  cityForm.reset();

  // update the ui with new city
  updateCity(cityValue)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
