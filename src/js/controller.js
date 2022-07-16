import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";
import * as server from "./server/server";
import countryClient from "./client/countryClient.js";
import searchClient from "./client/searchClient.js";
import resultClient from "./client/resultClient.js";
import paginationClient from "./client/paginationClient.js";
import homePage from "./client/homePage.js";
import bookmarksClient from "./client/bookmarksClient.js";
///////////////////////////////////////

// Displays the country of user's choice
const countryControl = async function () {
  try {
    // Gets the value after # from web url
    let country = window.location.hash.slice(1);
    if (country.includes("%20")) {
      country = country.split("%20").join(" ");
    }
    // Guard clause incase theres no country
    if (!country) return;
    // Before the country loads a spinner transformation is displayed
    countryClient._renderSpinner();

    // Waiting for the fetch request about country info to load
    await server.createCountry(country);

    // Updates the search section so that the active state is applied to current country
    resultClient._display(server.resultsPage());

    // Updates the bookmark section
    bookmarksClient._display(server.state.bookmarks);

    // Displays the country and a map based on the countrys coordinates using google maps api
    countryClient._display(server.state.country);
    countryClient._renderMap(server.state.country);
  } catch (err) {
    // Displays error message if promise was unsucessful
    countryClient._renderError();
    console.log(err);
  }
};

// Displays pagination and all the countries in a region
const searchControl = async function () {
  try {
    // Gets the value of what the user entered on search bar
    const search = searchClient._userSearch();

    // Guard clause incase user entered nothing
    if (!search) return;

    // waiting for fetch request about region info to load
    await server.searchResults(search);

    // Display the search results and pagination
    resultClient._display(server.resultsPage());
    paginationClient._display(server.state.search);
  } catch (err) {
    // User enters invalid region
    resultClient._renderError();
    console.log(err);
  }
};

/**
 * Displays pagination
 * @param {number} nextPage - used to display the next page
 */
const paginationControl = function (nextPage) {
  resultClient._display(server.resultsPage(nextPage));
  paginationClient._display(server.state.search);
};

// Resets everything back to original
const homeControl = function () {
  resultClient._homePage();
  countryClient._homePage();
  paginationClient._homePage();

  // Updates bookmark after hashchange so that active state is removed
  window.addEventListener("hashchange", function () {
    bookmarksClient._display(server.state.bookmarks);
  });
};

// Displays bookmarks
const bookmarkControl = function () {
  bookmarksClient._display(server.state.bookmarks);
};

const bookmarksButtonControl = function () {
  // If the country has not been bookmarked then bookmarked will be set to true, vice versa
  if (!server.state.country.bookmarked)
    server.addBookmark(server.state.country);
  else server.deleteBookmark(server.state.country.name);

  // Update country display
  countryClient._display(server.state.country);
  countryClient._renderMap(server.state.country);

  // If there's no bookmarks, reset it back to original, otherwise display the bookmarks
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

// Initializes all the event handlers
const init = function () {
  bookmarksClient._addHandler(bookmarkControl);
  countryClient._addHandler(countryControl);
  searchClient._addHandler(searchControl);
  paginationClient._addHandler(paginationControl);
  homePage._addHandler(homeControl);
  countryClient._addHandlerBookmark(bookmarksButtonControl);
};
init();
