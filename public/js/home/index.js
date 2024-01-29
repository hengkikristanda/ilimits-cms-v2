document.addEventListener("DOMContentLoaded", () => {
	const navbar = document.getElementById("navbar");
	navbar.innerHTML = renderNavBar();

	const drawer = document.getElementById("drawer");
	drawer.innerHTML = renderDrawer("Dashboard");
	/*
	const h6Elements = drawer.querySelectorAll("h6");
	let currentWidth = parseInt(window.getComputedStyle(drawer).width);
	let drawerStatus = sessionStorage.getItem("drawerStatus");
	if (!drawerStatus) {
		if (currentWidth < 100) drawerStatus = "collapse";
		else drawerStatus = "expand";
		sessionStorage.setItem("drawerStatus", drawerStatus);
	}


	if (drawerStatus === "expand" && currentWidth < 100) {
		drawer.style.width = "13rem";
		h6Elements.forEach((h6) => {
			h6.classList.remove("hidden");
		});
	} else if (drawerStatus === "collapse" && currentWidth > 100) {
		drawer.style.width = "3rem";
		h6Elements.forEach((h6) => {
			h6.classList.add("hidden");
		});
	} */

	handleToogleDrawer();
});
