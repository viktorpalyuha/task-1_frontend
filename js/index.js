import '../css/index.css'
import '../css/responsive.css'

const root = document.querySelector('.root');

async function fetchDataFromBack() {
  const response = await fetch('http://localhost:8080/');
  const data = await response.json();

  return data;
}

async function drawGrid() {
  const fetchedData = await fetchDataFromBack();

  const header = document.createElement('h1');
  header.innerHTML = 'Car Exhibtion';

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards-container');

  fetchedData.cars.map((car) => {
    const newCar = document.createElement('div');
    newCar.classList.add('card', 'tooltip');
    newCar.innerHTML = `
    <div class="container">
    <h4><b>Brand: ${car.make_display}</b></h4>
    <p>Car id: ${car.make_id}</p>
    <p>Uniqueness: ${car.make_is_common}</p>
    <p>Made in: ${car.make_country}</p>
    </div>`;

    const tooltip = document.createElement('span');
    tooltip.classList.add('tooltiptext');
    tooltip.innerHTML = `This is a nice looking ${car.make_display} from ${car.make_country}`;

    newCar.appendChild(tooltip);
    cardsContainer.append(newCar);
  });

  root.append(header);
  root.append(cardsContainer);
}

fetchDataFromBack();
drawGrid();
