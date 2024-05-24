import "./menu.js";
import "./passengers.js";
import "./radio-inputs.js";
import "./notifications.js";
import "./routes-popup.js";
import "./search-inputs.js";

const Calender = document.querySelector(".calender");
const date = document.querySelector(".Date");

const showAndCloseCalender = (event) => {
  Calender.classList.toggle("hidden");
};

date.addEventListener("click", showAndCloseCalender);
