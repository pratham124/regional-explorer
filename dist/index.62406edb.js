const countryContainer = document.querySelector(".country");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const fetchPro = fetch("https://restcountries.com/v3.1/name/japan");
const data = fetchPro.json();
console.log(data);

//# sourceMappingURL=index.62406edb.js.map
