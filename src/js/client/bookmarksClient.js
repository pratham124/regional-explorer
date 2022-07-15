import previewClient from "./previewClient";
import icons from "url:../../img/icons.svg";
class bookmarksClient extends previewClient {
  _parentEl = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a country to bookmark!";

  _addHandler(handler) {
    window.addEventListener("load", handler);
  }

  _bookmarkReset() {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>
        No bookmarks yet. Find a country and bookmark it :)
      </p>
    </div>`;

    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new bookmarksClient();
