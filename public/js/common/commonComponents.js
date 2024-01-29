const navbarMenu = [
	{
		section: "Home",
		menu: [{ href: "/pages/home", iconClass: "bi-file-earmark-bar-graph-fill", name: "Dashboard" }],
	},
	{
		section: "Content",
		menu: [
			{ href: "/pages/promotions", iconClass: "bi bi-megaphone-fill", name: "Promotions" },
			{ href: "/pages/publicDocs", iconClass: "bi bi-file-earmark-pdf-fill", name: "Documents" },
		],
	},
	{
		section: "Clients",
		menu: [
			{ href: "/pages/subscriber", iconClass: "bi bi-person-raised-hand", name: "Subscriber" },
		],
	},
	{
		section: "Web Pages",
		menu: [{ href: "/pages/footer", iconClass: "bi bi-c-circle-fill", name: "Footer" }],
	},
	{
		section: "Account",
		menu: [{ href: "/pages/accountSettings", iconClass: "bi bi-gear-fill", name: "Settings" }],
	},
];

function disableButton(targetButton, buttonLabel) {
	targetButton.disabled = true;
	targetButton.innerHTML = "<span class='loaderSmall'></span>";
}

function enableButton(targetButton, buttonLabel) {
	targetButton.innerHTML = buttonLabel;
	targetButton.disabled = false;
}

function renderInfoMessage(targetForm, infoMessage, alertType, isBlock = true) {
	const infoMessageElement = targetForm.querySelector("#info-message");
	infoMessageElement.style.display = "flex";
	infoMessageElement.classList.add(`alert-block-${alertType}`);
	if (!isBlock) {
		infoMessageElement.classList.add("w-fit");
	}

	infoMessageElement.innerText = infoMessage;
}

function renderNavBar() {
	return [
		`<div class="flex justify-between h-16 items-center">`,
		`	<div id="drawerToggle" class="flex gap-4 items-center">`,
		`		<h3 class="bi bi-list font-bold icon-link-circle"></h3>`,
		`		<img src="/assets/img/logo.svg" class="max-h-8" />`,
		`	</div>`,
		`	<div class="flex gap-4">`,
		`		<div class="dropdown dropdown-end">`,
		`			<div tabindex="0" role="button" class="btn m-1 bi bi-person-circle icon-link-circle"></div>`,
		`			<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">`,
		`				<li><a href="/pages/accountSettings" class="bi bi-gear-fill">Settings</a></li>`,
		`				<li><a href="/auth/logout" class="bi bi-power">Logout</a></li>`,
		`			</ul>`,
		`		</div>`,
		`	</div>`,
		`</div>`,
	].join("");
}

function renderDrawer(selectedPage) {
	const container = [`<div class="flex flex-col h-screen px-2">`];

	navbarMenu.map((item) => {
		container.push(
			[
				`<div class="flex items-center py-2">`,
				`	<span class="text-xs text-gray-700 font-semibold w-full">${item.section}</span>`,
				`</div>`,
			].join("")
		);

		item.menu.map((menu) => {
			let menuStyle = "item-menu";
			if (menu.name.toLowerCase() == selectedPage.toLowerCase()) {
				menuStyle += " item-menu-focus";
			}

			container.push(
				[
					`<a href="${menu.href}" class="${menuStyle}">`,
					`	<h5 class="${menu.iconClass}"></h5>`,
					`	<h6>${menu.name}</h6>`,
					`</a>`,
				].join("")
			);
		});
	});

	container.push(`</div>`);

	return container.join("");
}

function renderToast(textContent) {
	return [
		`<div class="alert alert-info">`,
		`	<span class="text-white">${textContent}</span>`,
		`</div>`,
	].join("");
}
