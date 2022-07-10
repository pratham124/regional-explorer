import icons from "url:../../img/icons.svg";

class countryClient {
  #data;
  #parentEl = document.querySelector(".country");
  #errorMessage = "We could not find that country. Please try another one!";

  _renderSpinner() {
    const markup = `
      <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
  `;
    this.#parentEl.innerHTML = "";
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${this.#errorMessage}</p>
          </div>
    `;
    this.#parentEl.innerHTML = "";
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _addHandler(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _display(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#parentEl.innerHTML = "";
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  #generateMarkup() {
    return `
     <figure class="country__fig">
        <img src="${this.#data.img}" alt="Country Flag" class="country__img" />
        <h1 class="country__title">
          <span>${this.#data.name}</span>
        </h1>
      </figure>
      <div class="country__head">

        <div class="country__details">
          <div class="country__info">
            <span class="country__info-text">${this.#data.officialName}</span>
          </div>
          <div class="country__info">
            <span class="country__info-data country__info-data--people">Continent:</span>
            <span class="country__info-text">${this.#data.continent}</span>

          </div>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark"></use>
          </svg>
        </button>
      </div>

      <div class="country__info-section">
        <div class="country__map"></div>
        <h2 class="heading--2">info</h2>
        <ul class="country__info-list">
          <li class="country__fact">

            <div class="country__desc">Area:</div>
            <div class="country__description">
              ${this.#data.area} km²
            </div>
          </li>

          <li class="country__fact">

            <div class="country__desc">Capital:</div>
            <div class="country__description">
              ${this.#data.capital}
            </div>
          </li>
          <li class="country__fact">

            <div class="country__desc">Citizens:</div>
            <div class="country__description">
              ${this.#data.citizens}
            </div>
          </li>
          <li class="country__fact">

            <div class="country__desc">Population:</div>
            <div class="country__description">
              ${(this.#data.population / 1000000).toFixed(2)} million
            </div>
          </li>
        </ul>
      </div>
      
    `;
  }
}

export default new countryClient();
