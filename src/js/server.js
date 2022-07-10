const TIMEOUT_TIME = 500;

export const state = {
  country: {},
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
    state.country = {
      img: data.flags.png,
      name: data.name.common,
      officialName: data.name.official,
      continent: data.continents[0],
      area: data.area,
      capital: data.capital,
      citizens: data.demonyms.eng.m,
      population: data.population,
    };
  } catch (err) {
    throw err;
  }
};
