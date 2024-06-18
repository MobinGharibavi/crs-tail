// Element selectors
const confirmBtn = document.getElementById("confirm_edit");
const cancelBtn = document.getElementById("cancel_edit");
const fastSearchEdit = document.getElementById("edit_fast");
const editBtn = document.getElementById("edit_btn");
const fastSearch = document.getElementById("fast_search");
const fastSearchInner = document.getElementById("inner_fast_search");
const innerEdit = document.getElementById("inner_edit");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close_modal");
const addDataBtn = document.getElementById("add_data_Modal");
const swapBtn = document.getElementById("swap_search_btn_modal");
const originInput = document.getElementById("origin_input_modal");
const destinationInput = document.getElementById("destination_input_modal");
const originAirportsList = document.getElementById(
  "origin_airports_list_modal"
);
const destinationAirportsList = document.getElementById(
  "destination_airports_list_modal"
);
const modalPrice = document.getElementById("modal_price");

// Initialize and load data
const dataForFastSearch = [
  { origin: "Mashhad", destination: "Najaf", detail: "1.500.00 تومان" },
  { origin: "Mashhad", destination: "Tehran", detail: "1.500.00 تومان" },
  { origin: "Tehran", destination: "Shiraz", detail: "1.500.00 تومان" },
  { origin: "Tehran", destination: "Ahwaz", detail: "1.500.00 تومان" },
  { origin: "Shiraz", destination: "Mashhad", detail: "1.500.00 تومان" },
  // Repeated data omitted for brevity
];

const existingData = JSON.parse(localStorage.getItem("fast_search")) || [];
if (!existingData.length) {
  localStorage.setItem("fast_search", JSON.stringify(dataForFastSearch));
}

// Utility functions
const hideElement = (element) => element && element.classList.add("hidden");
const showElement = (element) => element && element.classList.remove("hidden");

const filterAirportList = (query, list) => {
  const normalizedQuery = query.toLowerCase().trim();
  list.querySelectorAll(".js-airport").forEach((item) => {
    const airportName = item
      .querySelector(".airport-name")
      .textContent.toLowerCase()
      .trim();
    const airportCode = item
      .querySelector(".airport-code")
      .textContent.toLowerCase()
      .trim();
    item.classList.toggle(
      "hidden",
      !airportName.includes(normalizedQuery) &&
        !airportCode.includes(normalizedQuery)
    );
  });
};

// Event listeners
const showAndHideFastSearch = () => {
  fastSearchEdit.classList.toggle("hidden");
  fastSearch.classList.toggle("hidden");
};

editBtn.addEventListener("click", showAndHideFastSearch);
cancelBtn.addEventListener("click", showAndHideFastSearch);
confirmBtn.addEventListener("click", showAndHideFastSearch);

originInput.addEventListener("focus", () => (originInput.value = ""));
destinationInput.addEventListener("focus", () => (destinationInput.value = ""));

swapBtn.addEventListener("click", () => {
  [originInput.value, destinationInput.value] = [
    destinationInput.value,
    originInput.value,
  ];
});

[originAirportsList, destinationAirportsList].forEach((list) => {
  list.addEventListener("click", ({ target }) => {
    const airport = target.closest(".js-airport");
    if (!airport) return;

    const airportName = airport
      .querySelector(".airport-name")
      .textContent.trim();
    const relatedInput =
      list === originAirportsList ? originInput : destinationInput;
    relatedInput.value = airportName;
    hideElement(list);
  });
});

[originInput, destinationInput].forEach((input) => {
  input.addEventListener("input", () => {
    const list =
      input === originInput ? originAirportsList : destinationAirportsList;
    filterAirportList(input.value, list);
  });

  input.addEventListener("click", () => {
    showElement(
      input === originInput ? originAirportsList : destinationAirportsList
    );
    hideElement(
      input === originInput ? destinationAirportsList : originAirportsList
    );
  });
});

document.body.addEventListener("click", ({ target }) => {
  if (
    ![originInput, destinationInput].includes(target) &&
    !target.closest("#origin_airports_list_modal") &&
    !target.closest("#destination_airports_list_modal")
  ) {
    hideElement(originAirportsList);
    hideElement(destinationAirportsList);
  }
});

// Modal functions
const openModal = () => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
};
const openModalPrice = () => {
  modalPrice.classList.remove("hidden");
  modalPrice.classList.add("flex");
};

const closeModalPrice = (event) => {
  if (event.target.closest("#inner_modal_price")) return;
  modalPrice.classList.add("hidden");
  modalPrice.classList.remove("flex");
};

modalPrice.addEventListener("click", closeModalPrice);

const closeModal = () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
};

const closeModalOut = (event) => {
  if (event.target.closest("#inner_modal")) return;
  closeModal();
};

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", closeModalOut);

const addData = () => {
  if (!originInput.value.trim() || !destinationInput.value.trim()) {
    alert("Both origin and destination fields are required.");
    return;
  }

  const dataOfStorage = JSON.parse(localStorage.getItem("fast_search")) || [];
  dataOfStorage.push({
    origin: originInput.value,
    destination: destinationInput.value,
    detail: "1.500.00 تومان",
  });
  localStorage.setItem("fast_search", JSON.stringify(dataOfStorage));
  render();
  closeModal();
  originInput.value = "";
  destinationInput.value = "";
};

addDataBtn.addEventListener("click", addData);

// Render function
const render = () => {
  const dataOfStorage = JSON.parse(localStorage.getItem("fast_search")) || [];
  innerEdit.innerHTML = "";
  fastSearchInner.innerHTML = "";

  dataOfStorage.forEach((i) => {
    fastSearchInner.insertAdjacentHTML(
      "beforeend",
      `<div class="flex rounded cursor-pointer show-price-date p-2 justify-between w-full items-center"><span>${i.origin} to ${i.destination}</span><span>1.500.00 تومان</span></div>`
    );
  });

  for (let i = dataOfStorage.length; i < 12; i++) {
    fastSearchInner.insertAdjacentHTML(
      "beforeend",
      `<div class="border w-full h-10 flex cursor-pointer justify-center items-center border-dashed bg-[#F6FAFF] rounded border-[#8CB8FB]"><img src="/icons/UpdateMain/plus.svg" alt="" /></div>`
    );
  }

  dataOfStorage.forEach((i, index) => {
    const div = document.createElement("div");
    div.className =
      "flex rounded p-2 bg-[#FFE3E9] justify-between w-full items-center";
    div.innerHTML = `<span>${i.origin} to ${i.destination}</span><img src="/icons/UpdateMain/x-red.svg" alt="..." data-index="${index}">`;
    innerEdit.appendChild(div);
  });

  innerEdit.querySelectorAll("img[data-index]").forEach((img) => {
    img.addEventListener("click", (event) => {
      const index = parseInt(event.target.getAttribute("data-index"));
      deleteFastSearchData(index);
    });
  });

  document.querySelectorAll("#inner_fast_search .border").forEach((addBtn) => {
    addBtn.addEventListener("click", openModal);
  });

  document.querySelectorAll(".show-price-date").forEach((i) => {
    i.addEventListener("click", openModalPrice);
  });
};

// Delete fast search data
const deleteFastSearchData = (index) => {
  const dataOfStorage = JSON.parse(localStorage.getItem("fast_search")) || [];
  dataOfStorage.splice(index, 1);
  localStorage.setItem("fast_search", JSON.stringify(dataOfStorage));
  render();
};

document.addEventListener("DOMContentLoaded", render);
