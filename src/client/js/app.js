import fetch from "node-fetch";
import { doc } from "prettier";

// This event listener listens for a click on the search button
document.getElementById("btn").addEventListener("click", userInput);

// Function that fires off when the click has been registered
async function userInput(e) {
  e.preventDefault();

  // Take the city and date when user inputs the data and store them in variables
  const city = document.getElementById("city-input").value;
  const date = document.getElementById("date-picker").value;

  // Get the current date.
  let currentDate = new Date().toLocaleDateString();

  if (parseInt(date) >= parseInt(currentDate)) {
    // Store the day month and year
    const day = date.slice(0, 2);
    const month = date.slice(3, 5);
    const year = date.slice(6, 10);

    // Then change the order so and store in a variable so we can use this format for weatherbit api
    const fixDate = year + "-" + month + "-" + day;

    await postData("/clientData", {
      city: city,
      date: fixDate,
    });

    // functions to call servers after post request
    await callServer("/getWeatherbit");

    await callServer("/getPix");

    await callServer("/getRest");

    const getPlanData = await callServer("/getData");

    console.log(getPlanData);
    updateUI();
  } else {
    alert("Please enter a valid date.");
  }
}

async function postData(url, tripData) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tripData),
  });
}

const callServer = async (url) => {
  const asyncParams = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, asyncParams);
  try {
    const data = await res.json();
    return data;
  } catch {
    console.log(`Error: ${res.statusText}`);
  }
};

function updateUI() {
  document.querySelector(".city-image").src = getPlanData.image1;
  document.querySelector(".image-icon").src = getPlanData.flag;
  document.querySelector("'list-country").innerHTML =
    getPlanData.name + ", " + getPlanData.countryCode;
  document.querySelector(".call-code").innerHTML = getPlanData.callingCode;
  document.querySelector(".currency").innerHTML =
    getPlanData.currency + "(" + getPlanData.currencySym + ")";
  document.querySelector(".language").innerHTML = getPlanData.language;
  document.querySelector(".city-name").innerHTML = getPlanData.name;
  document.querySelector(
    ".icon-image"
  ).src = `https://www.weatherbit.io/static/img/icons/${getPlanData.icon}.png`;
  document.querySelector(".description").innerHTML = getPlanData.description;
  document.querySelector(".temp").innerHTML = getPlanData.temp + "°C";
  document.querySelector(".departure").innerHTML = getPlanData.date;
}

export { userInput };
