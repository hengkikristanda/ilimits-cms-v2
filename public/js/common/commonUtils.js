function handleToogleDrawer() {
	const drawer = document.getElementById("drawer");
	const drawerToggle = document.getElementById("drawerToggle");
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
	}

	drawerToggle.addEventListener("click", () => {
		drawerStatus = sessionStorage.getItem("drawerStatus");
		if (drawerStatus === "expand") {
			drawer.style.width = "3rem";
			h6Elements.forEach((h6) => {
				h6.classList.add("hidden");
			});
			sessionStorage.setItem("drawerStatus", "collapse");
		} else if (drawerStatus === "collapse") {
			drawer.style.width = "13rem";
			sessionStorage.setItem("drawerStatus", "expand");
			h6Elements.forEach((h6) => {
				h6.classList.remove("hidden");
			});
		}
	});
}

function handleInputSearchBox() {
	const inputSearchBox = document.getElementById("inputSearchBox");
	const inputClearSearchBox = document.getElementById("inputClearSearchBox");
	let showClearIcon = false;

	function handleClearSearchBoxIcon() {
		if (inputSearchBox.value !== "" && !showClearIcon) {
			showClearIcon = true;
			inputClearSearchBox.classList.remove("hidden");
			inputClearSearchBox.classList.add("flex");
		} else if (inputSearchBox.value === "" && showClearIcon) {
			showClearIcon = false;
			inputClearSearchBox.classList.remove("flex");
			inputClearSearchBox.classList.add("hidden");
		}
	}

	inputSearchBox.addEventListener("input", handleClearSearchBoxIcon);
	inputClearSearchBox.addEventListener("click", () => {
		inputSearchBox.value = "";
		handleClearSearchBoxIcon();
	});
}

function handleSelectedImage(e) {
	const selectedFile = e.target.files[0];

	if (selectedFile) {
		const fileType = selectedFile.type;
		const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

		if (!validImageTypes.includes(fileType)) {
			alert("Please select a valid image file (JPEG, PNG, GIF).");
			fileInput.value = "";
		} else {
			const reader = new FileReader();

			reader.onload = function (event) {
				const imageUrl = event.target.result;
				attachedImage.src = imageUrl;
			};

			reader.readAsDataURL(selectedFile);
		}
	}
}

function handleCanvasAttachImage() {
	const attachedImage = document.getElementById("attachedImage");
	const fileInput = document.getElementById("fileInput");

	attachedImage.addEventListener("click", () => {
		fileInput.click();
	});

	fileInput.addEventListener("change", handleSelectedImage);
}

function getFormData() {
	localStorage.clear();
	const attachedImage = document.getElementById("attachedImage");
	const title = document.getElementById("title");
	const subHeading = document.getElementById("subHeading");
	const footNote = document.getElementById("footNote");
	// const startDate = document.getElementById("startDate");
	// const endDate = document.getElementById("endDate");

	localStorage.setItem("imageData", attachedImage.src);

	let formData = {
		contentTitle: title.value,
		contentSubHeading: subHeading.value,
		contentFootNote: footNote.value,
		contentStartDate: startDate.value,
		contentEndDate: endDate.value,
		contentArticle: tinymce.activeEditor.getContent(),
	};
	return JSON.stringify(formData);
}

function handlePreview() {
	const htmlContent = getFormData();
	localStorage.setItem("previewContentData", htmlContent);
	window.open("/preview", "_blank");
}

async function handleSubmit() {
	const formData = new FormData();
	formData.append("image", document.getElementById("fileInput").files[0]);
	formData.append("promotionTitle", document.getElementById("title").value);
	formData.append("promotionSubHeading", document.getElementById("subHeading").value);
	formData.append("promotionFootNote", document.getElementById("footNote").value);
	formData.append("description", tinymce.activeEditor.getContent());

	try {
		const response = await fetch("/context/promotion", {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			const data = await response.json();
			console.log("Data sent successfully:", data);
			// Handle success response as needed
		} else {
			throw new Error("Network response was not ok.");
		}
	} catch (error) {
		console.error("Error:", error);
		// Handle errors
	}
}
