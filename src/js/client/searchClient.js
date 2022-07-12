class searchClient {
  #parentEl = document.querySelector(".search");

  _addHandler(handler) {
    this.#parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  _userSearch() {
    const search = this.#parentEl.querySelector(".search__field").value;
    this.#parentEl.querySelector(".search__field").value = "";
    return search;
  }
}

export default new searchClient();
