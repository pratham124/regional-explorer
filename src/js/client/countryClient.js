import icons from "url:../../img/icons.svg";
import Client from "./Client";
import { Loader } from "@googlemaps/js-api-loader";

const googleMapsApi = `AIzaSyBFNlQZRDsTZfnX-yqDb_33b0-B4MsxXqc`;

class countryClient extends Client {
  _parentEl = document.querySelector(".country");
  _errorMessage = "We could not find that country. Please try another one!";

  _renderMap(data) {
    // console.log(data.lat);
    const loader = new Loader({
      apiKey: googleMapsApi,
      version: "weekly",
      libraries: ["places"],
    });

    const mapOptions = {
      center: {
        lat: data.lat,
        lng: data.lng,
      },
      zoom: 6,
    };

    loader.loadCallback((e) => {
      if (e) {
        console.log(e);
      } else {
        new google.maps.Map(document.getElementById("map"), mapOptions);
      }
    });
  }

  _renderSpinner() {
    const markup = `
      <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
  `;
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _addHandler(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _addHandlerBookmark(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");

      if (!btn) return;

      handler();
    });
  }

  _homePage() {
    const markup = `
    <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>Start by searching for a region!!</p>
      </div>
    `;
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup() {
    return `
     <figure class="country__fig">
        <img src="${this._data.img}" alt="Country Flag" class="country__img" />
        <h1 class="country__title">
          <span>${this._data.name}</span>
        </h1>
      </figure>
      <div class="country__head">

        <div class="country__details">
          <div class="country__info">
            <span class="country__info-text">${this._data.officialName}</span>
          </div>
          <div class="country__info">
            <span class="country__info-data country__info-data--people">Continent:</span>
            <span class="country__info-text">${this._data.continent}</span>

          </div>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
          </svg>
        </button>
      </div>

      <div class="country__info-section">
        <div id="map" class="country__map"></div>
        <h2 class="heading--2">info</h2>
        <ul class="country__info-list">
          <li class="country__fact">

            <div class="country__desc">Area:</div>
            <div class="country__description">
              ${this._data.area} km²
            </div>
          </li>

          <li class="country__fact">

            <div class="country__desc">Capital:</div>
            <div class="country__description">
              ${this._data.capital}
            </div>
          </li>
          <li class="country__fact">

            <div class="country__desc">Residents:</div>
            <div class="country__description">
              ${this._data.citizens}
            </div>
          </li>
          <li class="country__fact">

            <div class="country__desc">Population:</div>
            <div class="country__description">
              ${(this._data.population / 1000000).toFixed(2)} million
            </div>
          </li>
        </ul>
      </div>
      
    `;
  }
}

export default new countryClient();
