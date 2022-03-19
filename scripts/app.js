const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
  const { cityDetails, weatherDetails } = data;

  // update details templates
  details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weatherDetails.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weatherDetails.Tempreture.Matric.value}</span>
            <span>&deg;c</span>
        </div>
    `;

  // updating the day and night and icon images
  let timeSrc = weatherDetails.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  time.setAttribute('scr', timeSrc);

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  // changing the display to visible
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

const updateCity = async () => {
  const cityDetails = await getCity(city);
  const weatherDetails = await getWeather(cityDetails.Key);

  return { cityDetails, weatherDetails };
};

cityForm.addEventListener('submit', (e) => {
  // set default action
  e.preventDefault();

  // get city value
  const cityValue = cityForm.name.value.trim();
  cityForm.reset();

  // update the ui with new city
  updateCity(cityValue)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
