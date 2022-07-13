import Client from "./Client";
import icons from "url:../../img/icons.svg";
import { COUNTRY_PER_PAGE } from "../server";

class paginationClient extends Client {
  _parentEl = document.querySelector(".pagination");

  _addHandler(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;
      const nextPage = +btn.dataset.next;
      // console.log(nextPage);
      handler(nextPage);
    });
  }

  _generateMarkup() {
    const pages = Math.ceil(this._data.results.length / COUNTRY_PER_PAGE);
    const curPage = this._data.page;
    // console.log(pages);
    // console.log(this._data);

    if (curPage === 1 && pages > 1) {
      return `
          <button class="btn--inline pagination__btn--next"  data-next="${
            curPage + 1
          }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>${curPage + 1}</span>
          </button>`;
    }

    if (curPage === pages && pages > 1) {
      return `
      <button class="btn--inline pagination__btn--next" data-next = "${
        curPage - 1
      }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>${curPage - 1}</span>
      </button>
      `;
    }
    if (curPage < pages) {
      return `
      <button class="btn--inline pagination__btn--prev" data-next = "${
        curPage - 1
      }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${curPage - 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next" data-next = " ${
            curPage + 1
          }">
            <span>${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}.svg#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }

    return "";
  }
}

export default new paginationClient();
