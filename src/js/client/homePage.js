class homePage {
  #parentEl = document.querySelector(".home-page");

  _addHandler(handler) {
    this.#parentEl.addEventListener("click", function (e) {
      handler();
    });
  }
}

export default new homePage();
