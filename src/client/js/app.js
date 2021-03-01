/* const dotenv = require("dotenv");
dotenv.config(); */

// const geoNamesApiKey = `&username=${process.env.GEONAMES_API}`;
const geoNamesApiKey = `&username=eugenecarbado`;
const geoNamesRoot = "http://api.geonames.org/searchJSON?q=";
const geoNamesParams = "&maxRows=1";

document.addEventListener("click", userInfo);

// Function that fires off when the click has been registered
function userInfo(e) {
  e.preventDefault();
  const city = "+" + document.getElementById("city-input").value;

  geoNamesCall(geoNamesRoot, city, geoNamesApiKey, geoNamesParams).then(
    postData("/add")
  );
}

// Takes the url + zip + API and calls the API for the data
const geoNamesCall = async (
  geoNamesRoot,
  city,
  geoNamesApiKey,
  geoNamesParams
) => {
  const response = await fetch(
    geoNamesRoot + city + geoNamesApiKey + geoNamesParams
  );
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// POST function to server
async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export { userInfo };
