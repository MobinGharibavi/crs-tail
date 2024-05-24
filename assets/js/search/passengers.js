const passengersInput = document.getElementById('passengers_input');
const passengersPopup = document.getElementById('passengers_popup');
const passengersSummary = document.getElementById('passengers_summary');
const passengerCountBtns = document.querySelectorAll('.js-passenger-count-btn');
const passengersPopupCloseBtn = document.getElementById('passengers_popup_close_btn');
const passengersPopupCancelBtn = document.getElementById('passengers_popup_cancel_btn');
const passengersPopupConfirmBtn = document.getElementById('passengers_popup_confirm_btn');

/* Popup toggle */
const passengersPopupHideBtns = [passengersPopupCloseBtn, passengersPopupCancelBtn, passengersPopupConfirmBtn];

passengersInput.addEventListener('click', showPassengersPopup);
passengersPopupHideBtns.forEach((btn) => btn.addEventListener('click', hidePassengersPopup));

document.body.addEventListener('click', (event) => {
	const isInsidePassengersPopup = event.target.closest('#passengers_input');
	if (isInsidePassengersPopup) return;

	hidePassengersPopup(event);
});

function hidePassengersPopup(event) {
	event.stopPropagation();
	passengersPopup.classList.add('hidden');
}

function showPassengersPopup() {
	passengersPopup.classList.remove('hidden');
}

/* Counting */
const passengers = {
	adult: 1,
	child: 0,
	infant: 0,
};

passengerCountBtns.forEach((btn) => {
	btn.addEventListener('click', () => {
		const passengerType = btn.dataset.type;
		const passengerCount = Number(btn.dataset.count);
		const passengerCountSpan = document.getElementById(`passengers_${passengerType}_count`);

		if (passengers[passengerType] === 0 && passengerCount === -1) return;
		if (passengers.adult === 1 && passengerType === 'adult' && passengerCount === -1) return;

		passengers[passengerType] += passengerCount;

		const minusBtn = btn?.previousElementSibling?.previousElementSibling;
		if (passengers[passengerType] === 0) {
			btn.classList.add('opacity-30');
		} else if (minusBtn) {
			minusBtn.classList.remove('opacity-30');
		}

		passengerCountSpan.textContent = passengers[passengerType];

		const adults = `${passengers.adult} Adult${passengers.adult > 1 ? 's' : ''}`;
		const children = `${passengers.child} Child${passengers.child > 1 ? 'ren' : ''}`;
		const infants = `${passengers.infant} Infant${passengers.infant > 1 ? 's' : ''}`;

		const countSummary =
			passengers.child && passengers.infant
				? `${adults} - ${children} - ${infants}`
				: passengers.child
				? `${adults} - ${children}`
				: passengers.infant
				? `${adults} - ${infants}`
				: adults;

		passengersSummary.textContent = countSummary;
	});
});
