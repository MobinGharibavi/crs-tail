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

let dataOfStorage = JSON.parse(localStorage.getItem("fast_search"));

const deleteFastSearchData = (index) => {
  dataOfStorage = dataOfStorage.filter((_, i) => i !== parseInt(index));
  localStorage.setItem("fast_search", JSON.stringify(dataOfStorage));
  render();
};

// Function to open modal
function openModal() {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

// Function to close modal
function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}
closeModalBtn.addEventListener("click", closeModal);

let originValue = document.getElementById("origin_input_modal");
let destinationValue = document.getElementById("destination_input_modal");
const addData = () => {
  dataOfStorage.push({
    origin: originValue.value,
    destination: destinationValue.value,
    detail: "1.500.00 تومان",
  });
  localStorage.setItem("fast_search", JSON.stringify(dataOfStorage));
  render();
  closeModal();
};
addDataBtn.addEventListener("click", addData);

// Function to swap origin and destination input values
const swapValues = () => {
  const temp = originValue.value;
  originValue.value = destinationValue.value;
  destinationValue.value = temp;
};
swapBtn.addEventListener("click", swapValues);

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
            class="border w-full h-10 flex justify-center items-center border-dashed bg-[#F6FAFF] rounded border-[#8CB8FB]">
            <img src="/icons/UpdateMain/plus.svg" alt="" />
          </div>
        `
    );
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
  const addOpenModal = document.querySelector("#inner_fast_search .border");
  addOpenModal.addEventListener("click", openModal);
};

document.addEventListener("DOMContentLoaded", () => {
  // Load data from local storage if available
  const storedData = localStorage.getItem("fast_search");
  if (storedData) {
    dataOfStorage = JSON.parse(storedData);
  }
  render();
});
