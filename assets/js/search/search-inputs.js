const originInput = document.getElementById("origin_input");
const destinationInput = document.getElementById("destination_input");
const originAriportsList = document.getElementById("origin_airports_list");
const destinationAriportsList = document.getElementById(
  "destination_airports_list"
);

const searchInputs = [originInput, destinationInput];
const airportLists = [originAriportsList, destinationAriportsList];

originInput.addEventListener("focus", () => (originInput.value = ""));
destinationInput.addEventListener("focus", () => (destinationInput.value = ""));

/* Swap search input values */
const swapSearchBtn = document.getElementById("swap_search_btn");
swapSearchBtn.addEventListener("click", () => {
  [originInput.value, destinationInput.value] = [
    destinationInput.value,
    originInput.value,
  ];
});

/* Handle input dropdowns */
airportLists.forEach((list) => {
  list.addEventListener("click", ({ target }) => {
    const airport = target.closest(".js-airport");
    const airportItem = event.target.closest(".airport-item");
    if (!airport) return;
    if (!airportItem) return;

    const airportName = airportItem
      .querySelector(".airport-name")
      .textContent.trim()
      .replace(/\s+/g, " ");
    const cityCode = airport
      .querySelector(".city-code")
      .textContent.trim()
      .replace(/\s+/g, " ");

    const relatedInput =
      list.id === "origin_airports_list" ? originInput : destinationInput;

    relatedInput.value = `${airportName} (${cityCode})`;

    hideElement(list);
  });
});

searchInputs.forEach((input) => {
  input.addEventListener("input", () => {
    const list =
      input === originInput ? originAriportsList : destinationAriportsList;
    filterAirportList(input.value.toLowerCase().trim(), list);
  });

  input.addEventListener("click", () => {
    if (input === originInput) {
      showElement(originAriportsList);
      hideElement(destinationAriportsList);
    } else {
      showElement(destinationAriportsList);
      hideElement(originAriportsList);
    }
  });
});

document.body.addEventListener("click", ({ target }) => {
  const targetIsInput = searchInputs.includes(target);
  const targetIsList =
    target.closest("#origin_airports_list") ||
    target.closest("#destination_airports_list");
  if (targetIsInput || targetIsList) return;

  airportLists.forEach((list) => hideElement(list));
});

/* Utilities */
function hideElement(element) {
  if (element) element.classList.add("hidden");
}

function showElement(element) {
  if (element) element.classList.remove("hidden");
}

function filterAirportList(query, list) {
  const items = list.querySelectorAll(".js-airport");

  items.forEach((item) => {
    const cityNameElement = item.querySelector(".city");
    const cityCodeElement = item.querySelector(".city-code");

    if (cityNameElement && cityCodeElement) {
      const cityName = cityNameElement.textContent.toLowerCase().trim();
      const cityCode = cityCodeElement.textContent.toLowerCase().trim();

      const isIncluded =
        cityName.includes(query.toLowerCase().trim()) ||
        cityCode.includes(query.toLowerCase().trim());
      item.classList.toggle("hidden", !isIncluded);
    }
  });

  showElement(list);
}
