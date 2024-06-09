/* Sidebar menu */
const sidebarMenuIcon = document.getElementById('sidebar_menu_icon');
const sidebarMenu = document.getElementById('sidebar_menu');

sidebarMenuIcon.addEventListener('click', () => sidebarMenu.classList.toggle('mobile:hidden'));

/* Dropdown menu */
// const dropdownMenu = document.getElementById('dropdown_menu');
// const dropdownMenuBtn = document.getElementById('dropdown_menu_btn');

// dropdownMenuBtn.addEventListener('click', () => dropdownMenu.classList.toggle('hidden'));

// document.body.addEventListener('click', ({ target }) => {
// 	if (!dropdownMenuBtn.contains(target) && !dropdownMenu.contains(target)) {
// 		dropdownMenu.classList.add('hidden');
// 	}
// });
