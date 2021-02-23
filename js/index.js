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
    newCar.classList.add('card');
    newCar.innerHTML = `
      <div class="container">
      <h4><b>Brand: ${car.make_display}</b></h4>
      <p>Car id: ${car.make_id}</p>
      <p>Uniqueness: ${car.make_is_common}</p>
      <p>Made in: ${car.make_country}</p>
      </div>`;
    cardsContainer.append(newCar);
  });

  root.append(header);
  root.append(cardsContainer);
}

fetchDataFromBack();
drawGrid();
