import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params = new URLSearchParams(search);
  let adventureID = params.get("adventure");

  return adventureID;

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let advDetailData = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    return await advDetailData.json();
  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let titleEle = document.getElementById("adventure-name");
  titleEle.innerHTML = adventure.name;

  let subtitleEle = document.getElementById("adventure-subtitle");
  subtitleEle.innerHTML = adventure.subtitle;

  let imageLinks = adventure.images;
  let insertImgEle = document.getElementById("photo-gallery");
  imageLinks.forEach((imgLink) => {
    let divEle = document.createElement("div");
    divEle.innerHTML = `
      <img src=${imgLink} class="activity-card-image" />
    `;
    insertImgEle.append(divEle);
  });

  let contentEle = document.getElementById("adventure-content");
  contentEle.innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let insertCarouselEle = document.getElementById("photo-gallery");
  insertCarouselEle.innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner"></div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
      </button>
    </div>                          
  `;

  let innerCarouselEle = document.getElementsByClassName('carousel-inner')[0];
  images.forEach((imageLink) => {
    let divEle = document.createElement('div');
    divEle.className = "carousel-item";

    divEle.innerHTML = `
      <img src=${imageLink} class="d-block w-100 activity-card-image">
    `;

    innerCarouselEle.append(divEle);
  });
  let firstDivEle = document.getElementsByClassName('carousel-item')[0];
  firstDivEle.className = "carousel-item active";
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById('reservation-panel-sold-out').style.display = "none";
    document.getElementById('reservation-panel-available').style.display = "block";
    document.getElementById('reservation-person-cost').innerHTML = adventure.costPerHead;
  }
  else {
    document.getElementById('reservation-panel-available').style.display = "none";
    document.getElementById('reservation-panel-sold-out').style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById('reservation-cost').innerHTML = adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  
  let formELe = document.getElementById('myForm');

  formELe.addEventListener('submit', function(event){
    event.preventDefault();

    let reservationData = {
      name: formELe.elements["name"].value,
      date: formELe.elements["date"].value,
      person: formELe.elements["person"].value,
      adventure: adventure.id,
    };

    let options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    };

    try {
      fetch(config.backendEndpoint + '/reservations/new', options)
        .then(res => res.json())
        .then(function (data) {
          let name = formELe.elements["name"];
          let date = formELe.elements["name"];
          let person = formELe.elements["name"];
          name.innerHTML = data.name;
          date.innerHTML = data.date;
          person.innerHTML = data.person;
        })
        .then(alert('success'))
        .then(window.location.reload());
    }
    catch(err) {
      alert('Failed!');
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved) 
  {
    document.getElementById('reserved-banner').style.display = "block";
  }
  else
  {
    document.getElementById('reserved-banner').style.display = "none";  
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
