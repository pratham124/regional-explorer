import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";
import icons from "url:../img/icons.svg";
import * as server from "./server.js";
import countryClient from "./client/countryClient.js";
import searchClient from "./client/searchClient.js";
import resultClient from "./client/resultClient.js";
///////////////////////////////////////

const countryControl = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    countryClient._renderSpinner();
    await server.createCountry(id);
    // console.log(server.state.country);

    countryClient._display(server.state.country);
  } catch (err) {
    console.log(err);
  }
};

const searchControl = async function () {
  const search = searchClient._userSearch();
  if (!search) return;
  await server.searchResults(search);
  // console.log(server.state.search.results);
  resultClient._display(server.state.search.results);
};

const init = function () {
  countryClient._addHandler(countryControl);
  searchClient._addHandler(searchControl);
};
init();
