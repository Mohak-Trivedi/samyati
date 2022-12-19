import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint + '/cities');
    let citiesData = await res.json();

    return citiesData;
  } catch(err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let divColEle = document.createElement('div');
  divColEle.className = 'col-12 col-sm-6 col-xl-3 mb-4';
  divColEle.innerHTML = `
    <a href="pages/adventures/?city=${id}" id="${id}">
      <div class="tile">
        <img src=${image} />
        <div class="tile-text text-center"> 
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
      </div>
    </a>`;
  
  let divRowEle = document.getElementById('data');
  divRowEle.append(divColEle);
}

export { init, fetchCities, addCityToDOM };
