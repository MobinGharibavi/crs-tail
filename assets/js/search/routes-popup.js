const routesPopup = document.getElementById('routes_popup');
const routesPopupTitle = document.getElementById('routes_popup_title');
const routesPopupOverlay = document.getElementById('routes_popup_overlay');
const routesPopupCloseBtn = document.getElementById('routes_popup_close_btn');
const routeDestinationsLists = document.querySelectorAll('.js-route-destinations-list');

routeDestinationsLists.forEach((list) => {
	list.addEventListener('click', ({ target }) => {
		const routeDestination = target.closest('.js-route-destination');
		if (!routeDestination) return;

		const routeDestinationsListTitle = list.parentElement.querySelector('.js-route-destinations-list-title');
		const routeTitle = `${routeDestinationsListTitle.textContent}${routeDestination.textContent}`;
		routesPopupTitle.textContent = routeTitle;

		showRoutesPopup();
	});
});

routesPopupCloseBtn.addEventListener('click', hideRoutesPopup);
routesPopupOverlay.addEventListener('click', ({ target, currentTarget }) => {
	if (target === currentTarget) hideRoutesPopup();
});

function showRoutesPopup() {
	routesPopupOverlay.classList.replace('hidden', 'flex');
}
function hideRoutesPopup() {
	routesPopupOverlay.classList.replace('flex', 'hidden');
}
