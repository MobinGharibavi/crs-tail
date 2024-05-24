const notificationsPopup = document.getElementById('notifications_popup');
const notificationsPopupBtn = document.getElementById('notifications_popup_btn');

notificationsPopupBtn.addEventListener('click', (event) => {
	event.stopPropagation();
	notificationsPopup.classList.toggle('hidden');
});

document.body.addEventListener('click', ({ target }) => {
	const isInsideNotificationsPopup = target.closest('#notifications_popup');
	if (isInsideNotificationsPopup) return;

	notificationsPopup.classList.add('hidden');
});
