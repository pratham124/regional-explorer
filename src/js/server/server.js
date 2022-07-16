import { async } from "regenerator-runtime";

const TIMEOUT_TIME = 500;
export const COUNTRY_PER_PAGE = 9;

export const state = {
  country: {},
  search: {
    results: [],
    page: 1,
  },
  bookmarks: [],
};

// Used to create a promise rejection error incase fetch request for country and region takes longer than 5s
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Creates object containing country info
export const createCountry = async function (country) {
  try {
    // Gets data from api
    const fetchPromise = await fetch(
      `https://restcountries.com/v3.1/name/${country}?fullText=true`
    );

    // race is used to get whichever parameter executes first
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_TIME)]);
    const [data] = await res.json();

    // create object
    state.country = {
      img: data.flags.png,
      name: data.name.common,
      officialName: data.name.official,
      continent: data.continents[0],
      area: data.area,
      capital: data.capital,
      citizens: data.demonyms.eng.m,
      population: data.population,
      lat: data.latlng[0],
      lng: data.latlng[1],
      region: data.region,
    };

    // If the country
    if (state.bookmarks.some((bookmark) => bookmark.name === country))
      state.country.bookmarked = true;
    else state.country.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const searchResults = async function (search) {
  try {
    const fetchPromise = fetch(
      `https://restcountries.com/v3.1/region/${search}`
    );
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_TIME)]);
    const data = await res.json();

    state.search.results = data.map((country) => {
      return {
        name: country.name.common,
        img: country.flags.png,
        region: country.region,
      };
    });

    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {number} page - current page number
 * @returns {array} array of the countries to display
 */
export const resultsPage = function (page = state.search.page) {
  // Updates page num in the object
  state.search.page = page;
  const firstCountry = COUNTRY_PER_PAGE * (page - 1);
  const lastCountry = COUNTRY_PER_PAGE * page;

  return state.search.results.slice(firstCountry, lastCountry);
};

// Updates local storage
const updateBookmarks = function () {
  localStorage.setItem("bookmark", JSON.stringify(state.bookmarks));
};

// Add bookmark to local storage and bookmarks array
export const addBookmark = function (country) {
  state.bookmarks.push(country);
  if (country.name === state.country.name) state.country.bookmarked = true;

  updateBookmarks();
};

// Delete bookmark from local storage and bookmarks array
export const deleteBookmark = function (name) {
  const index = state.bookmarks.findIndex((el) => el.name === name);
  state.bookmarks.splice(index, 1);
  if (name === state.country.name) state.country.bookmarked = false;

  updateBookmarks();
};

// Gets the bookmarks from local storage
const init = function () {
  const storage = localStorage.getItem("bookmark");
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

// const clearBookmarks = function () {
//   localStorage.clear("bookmark");
// };

// clearBookmarks();
