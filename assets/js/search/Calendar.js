const CalenderGe = document.querySelector(".calender-gregorian");
const CalenderJa = document.querySelector(".calender-jalali");
const gregorianBtn = document.querySelector(".gregorian-btn");
const jalaliBtn = document.querySelector(".jalali-btn");
const date = document.querySelector(".Date");
const calendarPopupCloseBtnGe = document.getElementById(
  "calendar_popup_close_btn_ge"
);
const calendarPopupCloseBtnJa = document.getElementById(
  "calendar_popup_close_btn_ja"
);
const calendarPopupCancelBtnGe = document.getElementById(
  "calendar_popup_cancel_btn_ge"
);
const calendarPopupConfirmBtnGe = document.getElementById(
  "calendar_popup_confirm_btn_ge"
);
const calendarPopupCancelBtnJa = document.getElementById(
  "calendar_popup_cancel_btn_ja"
);
const calendarPopupConfirmBtnJa = document.getElementById(
  "calendar_popup_confirm_btn_ja"
);

/* Popup toggle */
const calendarPopupHideBtns = [
  calendarPopupCancelBtnGe,
  calendarPopupConfirmBtnGe,
  calendarPopupCancelBtnJa,
  calendarPopupConfirmBtnJa,
  calendarPopupCloseBtnGe,
  calendarPopupCloseBtnJa,
];
calendarPopupHideBtns.forEach((btn) =>
  btn.addEventListener("click", hideCalendarPopup)
);

document.body.addEventListener("click", (event) => {
  const isInsidePassengersPopupGe = event.target.closest(".calender-gregorian");
  const isInsidePassengersPopupJa = event.target.closest(".calender-jalali");

  if (isInsidePassengersPopupJa || isInsidePassengersPopupGe) return;

  if (!event.target.closest(".Date")) {
    hideCalendarPopup(event);
  }
});

const showAndCloseCalender = (event) => {
  const isInsidePassengersPopupGe = event.target.closest(".calender-gregorian");
  const isInsidePassengersPopupJa = event.target.closest(".calender-jalali");
  if (isInsidePassengersPopupJa || isInsidePassengersPopupGe) return;
  CalenderGe.classList.toggle("hidden");
};

date.addEventListener("click", showAndCloseCalender);
jalaliBtn.addEventListener("click", () => {
  CalenderGe.classList.add("hidden");
  CalenderJa.classList.remove("hidden");
});
gregorianBtn.addEventListener("click", () => {
  CalenderJa.classList.add("hidden");
  CalenderGe.classList.remove("hidden");
});

function hideCalendarPopup(event) {
  event.stopPropagation();
  CalenderGe.classList.add("hidden");
  CalenderJa.classList.add("hidden");
}
