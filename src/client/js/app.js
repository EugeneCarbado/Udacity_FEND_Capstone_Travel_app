// This event listener listens for the click on the search button
document.getElementById("btn").addEventListener("click", userInput);

// Function that fires off when the click has been registered
function userInput(e) {
  e.preventDefault;

  // Take the city and date when user inputs the data and store them in variables
  const city = document.getElementById("city-input").value;
  const date = document.getElementById("date-picker").value;

  // Store the day month and year
  const day = date.slice(0, 2);
  const month = date.slice(3, 5);
  const year = date.slice(6, 10);

  // Then change the order so and store in a variable so we can use this format for weatherbit api
  const fixDate = year + "-" + month + "-" + day;

  const data = { city, fixDate };
  const options = {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  fetch("/clientData", options);
}

export { userInput };
