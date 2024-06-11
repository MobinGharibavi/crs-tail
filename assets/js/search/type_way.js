const Way = document.getElementById("way");
const wayBtn = document.getElementById("way_btn");
const classType = document.getElementById("class_type");
const classTypeBtn = document.getElementById("class_type_btn");
const innerWay = document.getElementById("inner_way");

const showWayBtn = (event) => {
  event.stopPropagation();
  Way.classList.toggle("hidden");
  classType.classList.add("hidden");
};

const showClassType = (event) => {
  event.stopPropagation();
  classType.classList.toggle("hidden");
  Way.classList.add("hidden");
};

document.body.addEventListener("click", (event) => {
  Way.classList.add("hidden");
  classType.classList.add("hidden");
});

wayBtn.addEventListener("click", showWayBtn);
classTypeBtn.addEventListener("click", showClassType);
Way.addEventListener(
  "click",
  (event) => (innerWay.innerHTML = event.target.innerHTML)
);
classType.addEventListener(
  "click",
  (event) => (classTypeBtn.innerHTML = event.target.innerHTML)
);
