import { mark } from "regenerator-runtime";
import Client from "./Client";

export default class previewClient extends Client {
  _generateMarkup() {
    return this._data.map(this._generatePreview).join();
  }

  _generatePreview(country) {
    let id = window.location.hash.slice(1);
    if (id.includes("%20")) {
      id = id.split("%20").join(" ");
    }
    if (id.includes("%C3%85")) {
      id = id.split("%C3%85").join("Å");
    }
    if (id.includes("%C3%A9")) {
      id = id.split("%C3%A9").join("é");
    }
    if (id.includes("%C3%A3")) {
      id = id.split("%C3%A3").join("ã");
    }
    if (id.includes("%C3%AD")) {
      id = id.split("%C3%AD").join("í");
    }
    if (id.includes("%C3%A7")) {
      id = id.split("%C3%A7").join("ç");
    }

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
