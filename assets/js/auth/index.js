const login = document.querySelector(".login");
const register = document.querySelector(".register");
const loginAdvantage = document.querySelector(".login-advantage");
const registerAdvantage = document.querySelector(".register-advantage");
const loginMobile = document.querySelector(".login-mobile");
const registerMobile = document.querySelector(".register-mobile");
const loginFeatures = document.querySelector(".login-features");
const registerFeatures = document.querySelector(".register-features");
const modal = document.querySelector(".modal-login");
const modalRegister = document.querySelector(".modal-register");
const backDrop = document.querySelector(".back-drop");
const back = document.querySelector(".back-auth");
const regChange = document.querySelector(".reg-btn");
const loginChange = document.querySelector(".login-btn");
const menu = document.querySelector(".menu");
const sideMenu = document.querySelector(".sideMenu");
const closeMenu = document.querySelector(".close-menu");

const toggleModal = () => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  backDrop.classList.remove("hidden");
};
const toggleModalRegister = () => {
  modalRegister.classList.remove("hidden");
  modalRegister.classList.add("flex");
  backDrop.classList.remove("hidden");
};
const closeModal = (event) => {
  if (event.target.closest(".inner-modal")) return;
  backDrop.classList.add("hidden");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  modalRegister.classList.add("hidden");
  modalRegister.classList.remove("flex");
};

const switchLoginToRegister = () => {
  modal.classList.remove("flex");
  modal.classList.add("hidden");
  modalRegister.classList.add("flex");
  modalRegister.classList.remove("hidden");
};
const switchRegisterToLogin = () => {
  modal.classList.add("flex");
  modal.classList.remove("hidden");
  modalRegister.classList.add("hidden");
  modalRegister.classList.remove("flex");
};
const openSideMenu = () => {
  sideMenu.classList.remove("hidden");
  sideMenu.classList.add("flex");
};
const closeSideMenu = () => {
  sideMenu.classList.remove("flex");
  sideMenu.classList.add("hidden");
};

register.addEventListener("click", toggleModalRegister);
login.addEventListener("click", toggleModal);
registerAdvantage.addEventListener("click", toggleModalRegister);
loginAdvantage.addEventListener("click", toggleModal);
registerMobile.addEventListener("click", toggleModalRegister);
loginMobile.addEventListener("click", toggleModal);
registerFeatures.addEventListener("click", toggleModalRegister);
loginFeatures.addEventListener("click", toggleModal);
modal.addEventListener("click", closeModal);
modalRegister.addEventListener("click", closeModal);
back.addEventListener("click", () => {
  backDrop.classList.add("hidden");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

regChange.addEventListener("click", switchLoginToRegister);
loginChange.addEventListener("click", switchRegisterToLogin);
menu.addEventListener("click", openSideMenu);
closeMenu.addEventListener("click", closeSideMenu);
sideMenu.addEventListener("click", closeSideMenu);
