const originInput = document.getElementById('origin_input');
const swapSearchBtn = document.getElementById('swap_search_btn');
const destinationInput = document.getElementById('destination_input');
const originAriportsList = document.getElementById('origin_airports_list');
const destinationAriportsList = document.getElementById('destination_airports_list');

const searchInputs = [originInput, destinationInput];
const ariportLists = [originAriportsList, destinationAriportsList];

/* Swap search input values */
swapSearchBtn.addEventListener('click', () => {
	[originInput.value, destinationInput.value] = [destinationInput.value, originInput.value];
});

/* Handle input dropdowns */
ariportLists.forEach((list) => {
	list.addEventListener('click', ({ target }) => {
		const airport = target.closest('.js-airport');
		if (!airport) return;

		const ariportName = airport.querySelector('span').nextSibling.nodeValue.trim();
		const relatedInput = list.id === 'origin_airports_list' ? originInput : destinationInput;
		relatedInput.value = ariportName;

		hideElement(list);
	});
});

searchInputs.forEach((input) => {
	input.addEventListener('click', () => {
		if (input.id === 'origin_input') {
			showElement(originAriportsList);
			hideElement(destinationAriportsList);
		} else {
			showElement(destinationAriportsList);
			hideElement(originAriportsList);
		}
	});
});

document.body.addEventListener('click', ({ target }) => {
	const targetIsInput = searchInputs.includes(target);
	const targetIsList = target.closest('#origin_airports_list') || target.closest('#destination_airports_list');
	if (targetIsInput || targetIsList) return;

	ariportLists.forEach((list) => hideElement(list));
});

/* Utilities */
function hideElement(element) {
	if (element) element.classList.add('hidden');
}

function showElement(element) {
	if (element) element.classList.remove('hidden');
}
