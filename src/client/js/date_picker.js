const datepicker = require("js-datepicker");

const picker = datepicker("#date-picker", {
  showAllDates: true,
  formatter: (input, date, instance) => {
    const value = date.toLocaleDateString();
    input.value = value; // Displays the current date as a string ex - '21/2/2010'
  },
});

export { picker };
