import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";
import icons from "url:../img/icons.svg";
import * as server from "./server.js";
import countryClient from "./client/countryClient.js";

const countryContainer = document.querySelector(".country");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const countryControl = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    countryClient._renderSpinner();
    await server.createCountry(id);
    console.log(server.state.country);

    countryClient._display(server.state.country);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  countryClient._addHandler(countryControl);
};
init();
