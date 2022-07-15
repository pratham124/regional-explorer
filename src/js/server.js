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

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const createCountry = async function (id) {
  try {
    const fetchPromise = await fetch(
      `https://restcountries.com/v3.1/name/${id}`
    );

    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_TIME)]);
    const [data] = await res.json();

    // console.log(data);
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

    if (state.bookmarks.some((bookmark) => bookmark.name === id))
      state.country.bookmarked = true;
    else false;
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
    // console.log(data);
    state.search.results = data.map((country) => {
      return {
        name: country.name.common,
        img: country.flags.png,
        region: country.region,
      };
    });
    // console.log(state.search.results);
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const resultsPage = function (page = state.search.page) {
  state.search.page = page;
  const firstCountry = COUNTRY_PER_PAGE * (page - 1);
  const lastCountry = COUNTRY_PER_PAGE * page;

  return state.search.results.slice(firstCountry, lastCountry);
};

// searchResults("europe");
const updateBookmarks = function () {
  localStorage.setItem("bookmark", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (country) {
  state.bookmarks.push(country);
  if (country.name === state.country.name) state.country.bookmarked = true;

  updateBookmarks();
};

export const deleteBookmark = function (name) {
  // Delete bookmark
  const index = state.bookmarks.findIndex((el) => el.name === name);
  state.bookmarks.splice(index, 1);

  if (name === state.country.name) state.country.bookmarked = false;

  updateBookmarks();
};

const init = function () {
  const storage = localStorage.getItem("bookmark");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

// const clearBookmarks = function () {
//   localStorage.clear("bookmark");
// };

// clearBookmarks();
