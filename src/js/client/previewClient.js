import { mark } from "regenerator-runtime";
import Client from "./Client";

export default class previewClient extends Client {
  _generateMarkup() {
    console.log(this._data);
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
        country.name === id ? "preview__link--active" : ""
      }" href="#${country.name}">
    <figure class="preview__fig">
      <img src="${country.img}" alt="Test" />
    </figure>
    <div class="preview__data">
      <h4 class="preview__title">${country.name}</h4>
      <p class="preview__region">${country.region}</p>

    </div>
  </a>
</li>`;
  }
}
