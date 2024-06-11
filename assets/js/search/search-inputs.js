const originInput = document.getElementById("origin_input");
const swapSearchBtn = document.getElementById("swap_search_btn");
const destinationInput = document.getElementById("destination_input");
const originAriportsList = document.getElementById("origin_airports_list");
const destinationAriportsList = document.getElementById(
  "destination_airports_list"
);

const searchInputs = [originInput, destinationInput];
const ariportLists = [originAriportsList, destinationAriportsList];

/* Swap search input values */
swapSearchBtn.addEventListener("click", () => {
  [originInput.value, destinationInput.value] = [
    destinationInput.value,
    originInput.value,
  ];
});

/* Handle input dropdowns */
ariportLists.forEach((list) => {
  list.addEventListener("click", ({ target }) => {
    const airport = target.closest(".js-airport");
    if (!airport) return;

    const airportName = airport
      .querySelector(".airport-name")
      .textContent.trim();
    const airportCode = airport
      .querySelector(".airport-code")
      .textContent.trim();
    const relatedInput =
      list.id === "origin_airports_list" ? originInput : destinationInput;

    relatedInput.value = `${airportName} (${airportCode})`;

    hideElement(list);
  });
});

searchInputs.forEach((input) => {
  input.addEventListener("input", () => {
    const list =
      input.id === "origin_input"
        ? originAriportsList
        : destinationAriportsList;
    filterAirportList(input.value, list);
  });

  input.addEventListener("click", () => {
    if (input.id === "origin_input") {
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

  ariportLists.forEach((list) => hideElement(list));
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
  const normalizedQuery = query.toLowerCase().trim();

  items.forEach((item) => {
    const airportName = item
      .querySelector(".airport-name")
      .textContent.toLowerCase()
      .trim();
    const airportCode = item
      .querySelector(".airport-code")
      .textContent.toLowerCase()
      .trim();

    if (
      airportName.includes(normalizedQuery) ||
      airportCode.includes(normalizedQuery)
    ) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
}
