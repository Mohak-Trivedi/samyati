import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  let cityId = params.get('city');

  return cityId;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let advData = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    return advData.json();
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log(adventures);

  adventures.forEach((adv) => {
    let divColEle = document.createElement('div');
    divColEle.className = 'col-6 col-lg-3 mb-3';
    divColEle.innerHTML = `
    <a href="detail/?adventure=${adv.id}" id="${adv.id}"> 
      <div class="card">
        <img src="${adv.image}" class="activity-card img"/>
        <div class="category-banner">${adv.category}</div>
        <div class="card-body d-md-flex justify-content-between">
          <h5 class="card-title">${adv.name}</h5>
          <p class="card-text">₹${adv.costPerHead}</p>
        </div>
        <div class="card-body d-md-flex justify-content-between"> 
          <h5 class="card-title">Duration</h5>
          <p class="card-text">${adv.duration} Hours</p>
        </div>
      </div>
    </a>`;

    let divRowEle = document.getElementById('data');
    divRowEle.append(divColEle);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(adv => adv.duration>=low && adv.duration<=high);
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredAdv = [];

  for (let i = 0; i < categoryList.length; i++)
  {
    let filterCurrCat = list.filter(adv => adv.category===categoryList[i]);

    filterCurrCat.forEach(adv => {filteredAdv.push(adv)});
  }
  
  return filteredAdv;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if ((filters.category.length != 0) && (filters.duration.length != 0)) {
    let lowTime = filters.duration.split("-")[0];
    let highTime = filters.duration.split("-")[1];
    let durationFiltered = filterByDuration(list, lowTime, highTime);
    return filterByCategory(durationFiltered, filters.category);
  }
  if (filters.category.length != 0) {
    return filterByCategory(list, filters.category);
  }
  if (filters.duration.length != 0) {
    let lowTime = filters.duration.split("-")[0];
    let highTime = filters.duration.split("-")[1];
    return filterByDuration(list, lowTime, highTime);
  }
  else {
    return list;
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters', JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(window.localStorage.getItem('filters'));

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList = filters.category;
  let catListEle = document.getElementById('category-list');
  categoryList.forEach(function (category) {
    let divEle = document.createElement('div');
    divEle.className = 'category-filter';
    divEle.innerText = category;
    catListEle.append(divEle);
  });

  let durationEle = document.getElementById('duration-select');
  durationEle.value = filters.duration;
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
