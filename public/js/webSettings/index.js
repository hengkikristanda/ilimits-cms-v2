document.addEventListener("DOMContentLoaded", () => {
	const navbar = document.getElementById("navbar");
	navbar.innerHTML = renderNavBar();

	const drawer = document.getElementById("drawer");
	drawer.innerHTML = renderDrawer("settings");

	handleToogleDrawer();

	handleSwitch();
	
});


