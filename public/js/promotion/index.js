document.addEventListener("DOMContentLoaded", () => {
	handleInputSearchBox();

	const navbar = document.getElementById("navbar");
	navbar.innerHTML = renderNavBar();

	const drawer = document.getElementById("drawer");
	drawer.innerHTML = renderDrawer("promotions");

	handleToogleDrawer();
});
