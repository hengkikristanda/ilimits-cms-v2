const MODAL_ACTION = {
	DELETE: {
		INFO: "Deleting...",
		ON_SUCCESS: "Successfully deleted",
		ON_FAILED: "Failed to delete",
	},
	CREATE: {
		INFO: "Creating...",
		ON_SUCCESS: "Successfully created",
		ON_FAILED: "Failed to create",
	},
};

const MODAL_ALERT = {
	DELETE: {
		icon: "bi-exclamation-diamond-fill",
		style: "text-danger",
		message: "Are you sure you want to delete this item?",
		info: "This action cannot be undone",
		OK: "Yes, Delete this item",
		CANCEL: "Cancel",
	},
	INFO: {
		icon: "bi bi-info-circle-fill",
		style: "text-baseOrange",
		message: "Default Message",
		info: "Default Info",
		OK: "Yes, Delete this item",
		CANCEL: "Cancel",
	},
};

const drawerMenu = [
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
		section: "Settings",
		menu: [
			{ href: "/pages/webSettings", iconClass: "bi bi-gear-fill ", name: "Web Settings" },
			{
				href: "/pages/accountSettings",
				iconClass: "bi bi-person-bounding-box",
				name: "Account",
			},
		],
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
	let loggedInUser = getCookie("loggedInUser") || "Demo User";

	loggedInUser = decodeURIComponent(loggedInUser);

	return [
		`<div class="flex justify-between h-16 items-center">`,
		`	<div id="drawerToggle" class="flex gap-4 items-center">`,
		`		<h3 class="bi bi-list font-bold icon-link-circle"></h3>`,
		`		<img src="/assets/img/logo.svg" class="max-h-8" />`,
		`	</div>`,
		`	<div class="flex gap-4 items-center">`,
		`		<h5>Welcome <span class="text-baseGreen font-semibold">${loggedInUser}</span></h5>`,
		`		<div class="dropdown dropdown-end">`,
		`			<div tabindex="0" role="button" class="btn m-1 bi bi-person-circle icon-link-circle"></div>`,
		`			<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">`,
		`				<li><a href="/pages/accountSettings" class="bi bi-person-bounding-box">Account Settings</a></li>`,
		`				<li><a href="/auth/logout" class="bi bi-power">Logout</a></li>`,
		`			</ul>`,
		`		</div>`,
		`	</div>`,
		`</div>`,
	].join("");
}

function renderDrawer(selectedPage) {
	const container = [`<div class="flex flex-col h-screen px-2">`];

	drawerMenu.map((item) => {
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

function loadingProcessComponent(modalAction) {
	let defaultModalAction = MODAL_ACTION.CREATE;
	if (modalAction) {
		defaultModalAction = modalAction;
	}

	return [
		`<div class="modal-box p-0 text-center w-full max-w-sm flex flex-col">`,
		`	<div id="loadingInfo" class="flex flex-col py-6 px-2 items-center">`,
		`		<h1 class="bi bi-info-circle text-primary text-6xl mb-8"></h1>`,
		`		<p class="font-semibold">${defaultModalAction.INFO}</p>`,
		`		<div class="loader5"></div>`,
		`	</div>`,
		`	<form id="dialog" method="dialog" class="hidden mb-4">`,
		`		<div id="modalButtonContainer class="flex">`,
		`			<button class="action-button action-button-primary mx-auto">Close</button>`,
		`		</div>`,
		`	</form>`,
		`</div>`,
	].join("");
}

function startLoader(loadingModal, modalAction, { redirectPage }) {
	loadingModal.innerHTML = loadingProcessComponent(modalAction);
	loadingModal.showModal();

	if (redirectPage) {
		const closeButton = loadingModal.querySelector("button");
		closeButton.addEventListener("mouseup", () => {
			// window.location.href = "/pages/promotions";
			window.location.href = redirectPage;
			document.getElementById("overlay").style.display = "block";
		});
	}
}

function stopLoader(loadingModal, modalAction, { isSuccess, reason }) {
	const modalIcon = loadingModal.querySelector("h1");
	modalIcon.classList.remove("bi-info-circle", "text-primary");

	let actionStatusInfo;

	if (isSuccess) {
		modalIcon.classList.add("bi-check-circle", "text-primary");
		actionStatusInfo = modalAction.ON_SUCCESS;
	} else {
		modalIcon.classList.add("bi-x-circle-fill", "text-danger");
		actionStatusInfo = `${modalAction.ON_FAILED}: ${reason}`;
	}

	const actionStatus = loadingModal.querySelector("p");
	actionStatus.textContent = actionStatusInfo;

	const loader = loadingModal.querySelector(".loader5");
	loader.remove();

	const dialog = loadingModal.querySelector("form");
	dialog.classList.remove("hidden");
}

// Modal
async function alertModalComponent(itemId, itemName, modalAlert) {
	return [
		`<div class="modal-box p-0 text-center w-full max-w-sm flex flex-col">`,
		`	<div class="flex flex-col py-6 px-2 items-center">`,
		`		<h1 class="bi ${modalAlert.icon} ${modalAlert.style} text-6xl mb-8"></h1>`,
		`		<h3 class="font-bold text-lg">${modalAlert.message}</h3>`,
		`		<p class="my-4 break-all">${itemName}</p>`,
		`		<p class="font-semibold">${modalAlert.info}</p>`,
		`	</div>`,
		`	<form id="deleteConfirmationForm" method="dialog">`,
		`		<div id="modalButtonContainer class="flex justify-between w-full border-t border-gray-300">`,
		`			<button class="text-base border-0 outline-0 font-semibold text-center w-1/2 border-r border-gray-300 py-4 h-fit bg-red-500 text-white hover:underline">`,
		`				${modalAlert.CANCEL}`,
		`			</button>`,
		`			<button id="confirmDelete_${itemId}" class="text-gray-500 font-semibold text-center w-1/2 py-4 h-fit cursor-pointer hover:underline">`,
		`				${modalAlert.OK}`,
		`			</button>`,
		`		</div>`,
		`	</form>`,
		`</div>`,
	].join("");
}
