// import Swiper JS
import Swiper from "swiper";
// import styles bundle
import "swiper/css";

const swiper = new Swiper(".swiper", {
  // Optional parameters
  //   direction: "horizontal",
  loop: true,
  slidesPerView: 11,
  spaceBetween: 5,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 8,
      spaceBetween: 10,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 11,
      spaceBetween: 5,
    },
  },
});

const nextBtn = document.querySelector(".swiper-button-next");
const prevBtn = document.querySelector(".swiper-button-prev");

nextBtn.addEventListener("click", () => swiper.slideNext());
prevBtn.addEventListener("click", () => swiper.slidePrev());
