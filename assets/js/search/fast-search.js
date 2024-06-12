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
let originValue = document.getElementById("origin_input_modal");
let destinationValue = document.getElementById("destination_input_modal");
const originAriportsList = document.getElementById(
  "origin_airports_list_modal"
);
const destinationAriportsList = document.getElementById(
  "destination_airports_list_modal"
);

const existItem = JSON.parse(localStorage.getItem("fast_search"));

const dataForFastSearch = [
  {
    origin: "Mashhad",
    destination: "Najaf",
    detail: "1.500.00 تومان",
  },
  {
    origin: "Mashhad",
    destination: "Tehran",
    detail: "1.500.00 تومان",
  },
  {
    origin: "Tehran",
    destination: "Shiraz",
    detail: "1.500.00 تومان",
  },
  {
    origin: "Tehran",
    destination: "Shiraz",
    detail: "1.500.00 تومان",
  },
  {
    origin: "Tehran",
    destination: "Shiraz",
    detail: "1.500.00 تومان",
  },
  {
    origin: "Tehran",
    destination: "Shiraz",
    detail: "1.500.00 تومان",
  },
  {
    origin: "Tehran",
    destination: "Shiraz",
    detail: "1.500.00 تومان",
  },
  {
    origin: "Tehran",
    destination: "Shiraz",
    detail: "1.500.00 تومان",
  },
  {
    origin: "Tehran",
    destination: "Shiraz",
    detail: "1.500.00 تومان",
  },
  {
    origin: "Tehran",
    destination: "Shiraz",
    detail: "1.500.00 تومان",
  },
];

if (!existItem || !existItem.length) {
  localStorage.setItem("fast_search", JSON.stringify(dataForFastSearch));
}

const showAndHideFastSearch = () => {
  fastSearchEdit.classList.toggle("hidden");
  fastSearch.classList.toggle("hidden");
};

editBtn.addEventListener("click", showAndHideFastSearch);
cancelBtn.addEventListener("click", showAndHideFastSearch);
confirmBtn.addEventListener("click", showAndHideFastSearch);

// search start
const searchInputs = [originValue, destinationValue];
const ariportLists = [originAriportsList, destinationAriportsList];

/* Swap search input values */
swapBtn.addEventListener("click", () => {
  [originValue.value, destinationValue.value] = [
    destinationValue.value,
    originValue.value,
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
      list.id === "origin_airports_list_modal" ? originValue : destinationValue;

    relatedInput.value = `${airportName}`;

    hideElement(list);
  });
});

searchInputs.forEach((input) => {
  input.addEventListener("input", () => {
    const list =
      input.id === "origin_input_modal"
        ? originAriportsList
        : destinationAriportsList;
    filterAirportList(input.value, list);
  });

  input.addEventListener("click", () => {
    if (input.id === "origin_input_modal") {
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
    target.closest("#origin_airports_list_modal") ||
    target.closest("#destination_airports_list_modal");
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
// search end

let dataOfStorage = JSON.parse(localStorage.getItem("fast_search"));

const deleteFastSearchData = (index) => {
  dataOfStorage = dataOfStorage.filter((_, i) => i !== parseInt(index));
  localStorage.setItem("fast_search", JSON.stringify(dataOfStorage));
  render();
};

// Function to open modal
function openModal() {
  // originValue.value = "";
  // destinationValue.value = "";
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

// Function to close modal
function closeModal() {
  // originValue.value = "";
  // destinationValue.value = "";
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}
closeModalBtn.addEventListener("click", closeModal);

const addData = () => {
  // Check if the input values are null or empty
  if (!originValue.value.trim() || !destinationValue.value.trim()) {
    alert("Both origin and destination fields are required.");
    return;
  }
  dataOfStorage.push({
    origin: originValue.value,
    destination: destinationValue.value,
    detail: "1.500.00 تومان",
  });
  localStorage.setItem("fast_search", JSON.stringify(dataOfStorage));
  render();
  closeModal();

  originValue.value = "";
  destinationValue.value = "";
};
addDataBtn.addEventListener("click", addData);

// Function to swap origin and destination input values
// const swapValues = () => {
//   const temp = originValue.value;
//   originValue.value = destinationValue.value;
//   destinationValue.value = temp;
// };
// swapBtn.addEventListener("click", swapValues);

const render = () => {
  innerEdit.innerHTML = ""; // Clear existing content
  fastSearchInner.innerHTML = ""; // Clear existing content in fastSearchInner

  dataOfStorage.forEach((i) => {
    fastSearchInner.insertAdjacentHTML(
      "beforeend",
      `
      <div class="flex rounded p-2 justify-between w-full items-center">
						 <span>${i.origin} to ${i.destination}</span>
						<span>
							1.500.00 تومان
						</span>
					</div>
      `
    );
  });

  if (dataOfStorage.length < 12) {
    fastSearchInner.insertAdjacentHTML(
      "beforeend",
      `
        <div
            class="border w-full h-10 flex cursor-pointer justify-center items-center border-dashed bg-[#F6FAFF] rounded border-[#8CB8FB]">
            <img src="/icons/UpdateMain/plus.svg" alt="" />
          </div>
        `
    );
  } else {
    closeModal();
  }

  dataOfStorage.forEach((i, index) => {
    const div = document.createElement("div");
    div.className =
      "flex rounded p-2 bg-[#FFE3E9] justify-between w-full items-center";
    div.innerHTML = `
      <span>${i.origin} to ${i.destination}</span>
      <img src="/icons/UpdateMain/x-red.svg" alt="..." data-index="${index}">
    `;
    innerEdit.appendChild(div);
  });

  document.querySelectorAll("#inner_edit img").forEach((img) => {
    img.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      deleteFastSearchData(index);
    });
  });

  // Attach event listeners to all plus images
  // document.querySelectorAll("#inner_fast_search .border").forEach((img) => {
  //   img.addEventListener("click", openModal);
  // });

  // Attach event listener to the plus button if it exists
  const addOpenModal = document.querySelector("#inner_fast_search .border");
  if (addOpenModal) {
    addOpenModal.addEventListener("click", openModal);
  } else {
    // Close the modal if dataOfStorage length is 12 or more
    closeModal();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Load data from local storage if available
  const storedData = localStorage.getItem("fast_search");
  if (storedData) {
    dataOfStorage = JSON.parse(storedData);
  }
  render();
});
