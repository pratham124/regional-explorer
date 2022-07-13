import { mark } from "regenerator-runtime";
import Client from "./Client";

class resultClient extends Client {
  _parentEl = document.querySelector(".results");
  _errorMessage = "Invalid Region. Please try again!";

  _generateMarkup() {
    return this._data.map(this._generatePreview).join();
    // console.log(this._data);
  }

  _generatePreview(country) {
    // console.log(country);
    // console.log(country);
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
      <a class="preview__link ${
        country.name.common === id ? "preview__link--active" : ""
      }" href="#${country.name.common}">
    <figure class="preview__fig">
      <img src="${country.flags.png}" alt="Test" />
    </figure>
    <div class="preview__data">
      <h4 class="preview__title">${country.name.common}</h4>
      <p class="preview__region">${country.region}</p>

    </div>
  </a>
</li>`;
  }
}

export default new resultClient();
