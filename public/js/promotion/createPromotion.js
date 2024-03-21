function getPromotionFormData(targetForm) {
	localStorage.clear();

	const attachedImage = targetForm.querySelector("#attachedImage");
	const title = targetForm.querySelector("#title");
	const subHeading = targetForm.querySelector("#subHeading");
	const footNote = targetForm.querySelector("#footNote");
	const ctaButtonLabel = targetForm.querySelector("#ctaButtonLabel");
	const ctaButtonLink = targetForm.querySelector("#ctaButtonLink");
	const submitType = targetForm.querySelector("#submitType");

	localStorage.setItem("imageData", attachedImage.src);

	let formData = {
		previewTitle: title.value,
		previewSubHeading: subHeading.value,
		previewFootNote: footNote.value,
		previewArticle: tinymce.activeEditor.getContent(),
		previewCtaButtonLabel: ctaButtonLabel.value,
		previewCtaButtonLink: ctaButtonLink.value,
		previewSubmitType: submitType.value,
	};
	return JSON.stringify(formData);
}

async function handlePreviewPromotion(targetForm) {
	const result = getPromotionFormData(targetForm);
	if (result) {
		localStorage.setItem("previewContentData", result);
		window.open("/pages/promotions/previewPromotion", "_blank");
	} else {
		alert("FAILED");
	}
}

async function handleSubmitContent(targetForm) {
	const title = targetForm.querySelector("#title");
	const subHeading = targetForm.querySelector("#subHeading");
	const footNote = targetForm.querySelector("#footNote");
	const ctaButtonLabel = targetForm.querySelector("#ctaButtonLabel");
	const ctaButtonLink = targetForm.querySelector("#ctaButtonLink");
	const submitType = targetForm.querySelector("#submitType");
	const myTextArea = targetForm.querySelector("#myTextArea");

	var fileInput = document.getElementById("fileInput");
	var file = fileInput.files[0];

	if (!file) {
		renderInfoMessage(targetForm, "Hero Images is required!", "danger");
	} else {
		var formData = new FormData();

		formData.append("heroImage", file); // Append the file
		formData.append("title", title.value); // Append the file
		formData.append("subHeading", subHeading.value); // Append the file
		formData.append("footNote", footNote.value); // Append the file
		formData.append("ctaButtonLabel", ctaButtonLabel.value); // Append the file
		formData.append("ctaButtonLink", ctaButtonLink.value); // Append the file
		formData.append("submitType", submitType.value); // Append the file
		formData.append("myTextArea", tinymce.activeEditor.getContent()); // Append the file

		const options = {
			timeout: 30000,
			method: "POST",
			body: formData,
		};

		const apiEndPoint = `/crud/promotions`;
		const redirectPage = "/pages/promotions";

		await sendRequest(apiEndPoint, options, MODAL_ACTION.CREATE, redirectPage);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	handleCanvasAttachImage();

	const discardChangesButton = document.getElementById("discardChangesButton");

	discardChangesButton.addEventListener("mouseup", () => {
		const alertModal = document.getElementById("alertModal");

		const alertTitle = alertModal.getElementsByTagName("h3");
		const alertMessage = alertModal.getElementsByTagName("p");
		alertTitle[0].textContent = "Are you sure you want to discard changes?";
		alertMessage[0].textContent = "This action cannot be undone.";

		const buttonModal = alertModal.querySelectorAll("#modalButtonContainer button")[1];
		buttonModal.classList.remove("hidden");
		buttonModal.innerHTML = "Yes, Discard Changes!";
		buttonModal.addEventListener("mouseup", () => {
			document.getElementById("overlay").style.display = "block";
			window.location.href = "/pages/promotions";
		});

		alertModal.showModal();
	});

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

	// Handle Preview Promotion
	const previewChangesButton = promotionDataForm.querySelector("#previewChangesButton");
	previewChangesButton.addEventListener("mouseup", () => handlePreviewPromotion(promotionDataForm));

	const autoTranslate = document.getElementById("autoTranslate");
	autoTranslate.addEventListener("mouseup", () => {
		const alertModal = document.getElementById("alertModal");

		const alertTitle = alertModal.getElementsByTagName("h3");
		const alertMessage = alertModal.getElementsByTagName("p");
		alertTitle[0].textContent = "Feature is disabled";
		alertMessage[0].textContent = "This Action Requires further Subscription";

		alertModal.showModal();
	});

	const aiSchedulerButton = document.getElementById("aiSchedulerButton");
	aiSchedulerButton.addEventListener("mouseup", () => {
		const alertModal = document.getElementById("alertModal");

		const alertTitle = alertModal.getElementsByTagName("h3");
		const alertMessage = alertModal.getElementsByTagName("p");
		alertTitle[0].textContent = "Feature is disabled";
		alertMessage[0].textContent = "This Action Requires further Subscription";

		alertModal.showModal();
	});

	const aiWritingAssitantButton = document.getElementById("aiWritingAssitantButton");
	aiWritingAssitantButton.addEventListener("mouseup", () => {
		const alertModal = document.getElementById("alertModal");

		const alertTitle = alertModal.getElementsByTagName("h3");
		const alertMessage = alertModal.getElementsByTagName("p");
		alertTitle[0].textContent = "Feature is disabled";
		alertMessage[0].textContent = "This Action Requires further Subscription";

		alertModal.showModal();
	});

	const navbar = document.getElementById("navbar");
	navbar.innerHTML = renderNavBar();

	const drawer = document.getElementById("drawer");
	drawer.innerHTML = renderDrawer("promotions");

	handleToogleDrawer();

	// Handle Save Content
	const submitContentButton = promotionDataForm.querySelector("#submitContentButton");
	submitContentButton.addEventListener("mouseup", () => handleSubmitContent(promotionDataForm));
});
