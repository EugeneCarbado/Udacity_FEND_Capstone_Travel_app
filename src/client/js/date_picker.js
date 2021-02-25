const datepicker = require("js-datepicker");

const picker = datepicker("#date-picker", {
  formatter: (input, date, instance) => {
    const value = date.toLocaleDateString();
    input.value = value; // Displays the current date as a string ex - '21/2/2010'
  },
});

picker.calendarContainer.style.setProperty("font-size", "1.5rem");

export { picker };
