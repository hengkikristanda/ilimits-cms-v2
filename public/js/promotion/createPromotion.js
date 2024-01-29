document.addEventListener("DOMContentLoaded", () => {
	handleCanvasAttachImage();

	const discardChangesButton = document.getElementById("discardChangesButton");
	const confirmDeleteButton = document.getElementById("confirmDeleteButton");

	discardChangesButton.addEventListener("mouseup", () => {
		const alertModal = document.getElementById("alertModal");

		const alertTitle = alertModal.getElementsByTagName("h3");
		const alertMessage = alertModal.getElementsByTagName("p");
		alertTitle[0].textContent = "Are you sure you want to discard changes?";
		alertMessage[0].textContent = "This action cannot be undone.";

		alertModal.showModal();
	});

	confirmDeleteButton.addEventListener("mouseup", () => {
		window.location.href = "/context/promotion";
	});

	const previewChangesButton = document.getElementById("previewChangesButton");
	previewChangesButton.addEventListener("mouseup", handlePreview);

	const promotionDataForm = document.getElementById("promotionDataForm");

	promotionDataForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const submitButton = promotionDataForm.querySelector('button[type="submit"]');
		if (submitButton) {
			submitButton.innerHTML = "<span class='loader6'></span>";
			submitButton.disabled = true;
		}

		// handleSubmit();
	});

	const autoTranslate = document.getElementById("autoTranslate");
	autoTranslate.addEventListener("mouseup", () => {
		const alertModal = document.getElementById("alertModal");

		const alertTitle = alertModal.getElementsByTagName("h3");
		const alertMessage = alertModal.getElementsByTagName("p");
		alertTitle[0].textContent = "Feature is disabled";
		alertMessage[0].textContent = "This Action Requires further Subscription";

		const modalButtonContainer = document.getElementById("modalButtonContainer");
		modalButtonContainer.innerHTML = `<button class="text-base border-0 outline-0 font-semibold text-center w-full border-r border-gray-300 py-4 h-fit">Close</button>`;

		alertModal.showModal();
	});

	const aiSchedulerButton = document.getElementById("aiSchedulerButton");
	aiSchedulerButton.addEventListener("mouseup", () => {
		const alertModal = document.getElementById("alertModal");

		const alertTitle = alertModal.getElementsByTagName("h3");
		const alertMessage = alertModal.getElementsByTagName("p");
		alertTitle[0].textContent = "Feature is disabled";
		alertMessage[0].textContent = "This Action Requires further Subscription";

		const modalButtonContainer = document.getElementById("modalButtonContainer");
		modalButtonContainer.innerHTML = `<button class="text-base border-0 outline-0 font-semibold text-center w-full border-r border-gray-300 py-4 h-fit">Close</button>`;

		alertModal.showModal();
	});

	const aiWritingAssitantButton = document.getElementById("aiWritingAssitantButton");
	aiWritingAssitantButton.addEventListener("mouseup", () => {
		const alertModal = document.getElementById("alertModal");

		const alertTitle = alertModal.getElementsByTagName("h3");
		const alertMessage = alertModal.getElementsByTagName("p");
		alertTitle[0].textContent = "Feature is disabled";
		alertMessage[0].textContent = "This Action Requires further Subscription";

		const modalButtonContainer = document.getElementById("modalButtonContainer");
		modalButtonContainer.innerHTML = `<button class="text-base border-0 outline-0 font-semibold text-center w-full border-r border-gray-300 py-4 h-fit">Close</button>`;

		alertModal.showModal();
	});

	const navbar = document.getElementById("navbar");
	navbar.innerHTML = renderNavBar();

	const drawer = document.getElementById("drawer");
	drawer.innerHTML = renderDrawer("promotions");

	handleToogleDrawer();
});
