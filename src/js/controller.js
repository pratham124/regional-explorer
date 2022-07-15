import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";
import * as server from "./server.js";
import countryClient from "./client/countryClient.js";
import searchClient from "./client/searchClient.js";
import resultClient from "./client/resultClient.js";
import paginationClient from "./client/paginationClient.js";
import homePage from "./client/homePage.js";
import bookmarksClient from "./client/bookmarksClient.js";
///////////////////////////////////////

const countryControl = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    countryClient._renderSpinner();

    await server.createCountry(id);

    resultClient._display(server.resultsPage());
    bookmarksClient._display(server.state.bookmarks);

    countryClient._display(server.state.country);
    countryClient._renderMap(server.state.country);
  } catch (err) {
    countryClient._renderError();
    console.log(err);
  }
};

const searchControl = async function () {
  try {
    const search = searchClient._userSearch();
    if (!search) return;
    await server.searchResults(search);
    // console.log(server.state.search.results);
    resultClient._display(server.resultsPage());
    paginationClient._display(server.state.search);
  } catch (err) {
    resultClient._renderError();
    console.log(err);
  }
};

const paginationControl = function (nextPage) {
  // console.log(nextPage);
  resultClient._display(server.resultsPage(nextPage));
  paginationClient._display(server.state.search);
};

const homeControl = function () {
  resultClient._homePage();
  countryClient._homePage();
  paginationClient._homePage();
};

const bookmarkControl = function () {
  bookmarksClient._display(server.state.bookmarks);
};

const bookmarksButtonControl = function () {
  if (!server.state.country.bookmarked)
    server.addBookmark(server.state.country);
  else server.deleteBookmark(server.state.country.name);
  // console.log(server.state.country);
  // Update country view
  countryClient._display(server.state.country);
  countryClient._renderMap(server.state.country);

  console.log(server.state.bookmarks);

  if (
    server.state.bookmarks === undefined ||
    server.state.bookmarks.length == 0
  ) {
    bookmarksClient._homePage();
    bookmarksClient._bookmarkReset();
  } else {
    bookmarksClient._display(server.state.bookmarks);
  }
};

const init = function () {
  bookmarksClient._addHandler(bookmarkControl);
  countryClient._addHandler(countryControl);
  searchClient._addHandler(searchControl);
  paginationClient._addHandler(paginationControl);
  homePage._addHandler(homeControl);
  countryClient._addHandlerBookmark(bookmarksButtonControl);
};
init();
