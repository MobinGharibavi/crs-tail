const radioGroup = document.getElementById('radio_group');
const radioInputs = document.querySelectorAll('[data-active-radio]');

radioGroup.addEventListener('click', ({ target }) => {
	const radioInput = target.closest('.js-radio-input');
	if (!radioInput) return;

	const radioInputIsActive = radioInput.dataset.activeRadio === 'true';
	if (radioInputIsActive) return;

	radioInputs.forEach((radioInput) => (radioInput.dataset.activeRadio = 'false'));
	radioInput.dataset.activeRadio = 'true';
});
