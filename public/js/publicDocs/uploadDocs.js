const maxFiles = 3;

function preventDefaults(e) {
	e.preventDefault();
	e.stopPropagation();
}

function highlight() {
	const dropArea = document.getElementById("drop-area");
	dropArea.classList.add("bg-bgDefault");
}

function unhighlight() {
	const dropArea = document.getElementById("drop-area");
	dropArea.classList.remove("bg-bgDefault");
}

function handleDrop(e) {
	const dt = e.dataTransfer;
	const files = dt.files;

	handleFiles(files);
}

function disableUploadButton() {
	const uploadDocumentButton = document.getElementById("uploadDocumentButton");
	uploadDocumentButton.classList.remove("action-button-primary");
	uploadDocumentButton.classList.add("action-button-disabled");
	uploadDocumentButton.disabled = true;
}

function enableUploadButton() {
	const uploadDocumentButton = document.getElementById("uploadDocumentButton");
	uploadDocumentButton.classList.add("action-button-primary");
	uploadDocumentButton.classList.remove("action-button-disabled");
	uploadDocumentButton.disabled = false;
}

function checkFileList() {
	if (fileList.childElementCount === 0) {
		disableUploadButton();
	} else {
		enableUploadButton();
	}
}

function removeFile(fileItem) {
	fileList.removeChild(fileItem);
	fileInput.value = "";
	checkFileList();
}

function removeAllFile() {
	const fileList = document.getElementById("fileList");
	while (fileList.firstChild) {
		fileList.removeChild(fileList.firstChild);
	}
}

// Handle files selected through file input
async function handleUploadDocument(event) {
	const uploadDocumentContainer = document.getElementById("uploadDocumentContainer");
	try {
		disableButton(this);

		const files = fileInput.files;

		const formData = new FormData();

		for (const file of files) {
			formData.append("files", file);
		}

		const options = {
			timeout: 30000,
			method: "POST",
			body: formData,
			credentials: "include",
		};

		const response = await fetchWithTimeout("/crud/uploads/publicDocs", options);

		if (!response.ok) {
			const errorResponseData = await response.json();
			throw new Error(errorResponseData.message);
		}

		const responseData = await response.json();
		renderInfoMessage(uploadDocumentContainer, responseData.message, "success");
	} catch (error) {
		if (error.name === "AbortError") {
			renderInfoMessage(uploadDocumentContainer, getHttpStatusMessage(408), "danger");
		} else {
			renderInfoMessage(uploadDocumentContainer, error.message, "danger");
		}
	} finally {
		enableButton(this, "Upload Document");
		disableUploadButton();
		removeAllFile();
	}
}

function uploadFile(file) {
	const fileList = document.getElementById("fileList");
	if (fileList.childElementCount >= maxFiles) {
		renderInfoMessage(
			document.getElementById("uploadDocumentContainer"),
			"You can only upload a maximum of " + maxFiles + " files.",
			"danger"
		);
		return;
	}

	const li = document.createElement("li");
	li.innerHTML = `<i class="bi bi-file-earmark-pdf-fill"></i>${file.name}<i class="bi bi-x-circle-fill text-red-500 cursor-pointer"></i>`;
	li.classList.add("flex", "gap-2", "border-b", "border-gray-300", "py-2", "text-xs", "mb-2");
	fileList.appendChild(li);

	li.querySelector(".bi-x-circle-fill").addEventListener("click", () => removeFile(li));
	checkFileList();
}

function validateFile(file) {
	const allowedTypes = ["application/pdf"];

	if (allowedTypes.includes(file.type)) {
		uploadFile(file);
	} else {
		alert("Invalid file type. Please upload a PDF file.");
	}
}

function handleFiles(files) {
	files = [...files];
	if (files.length > maxFiles) {
		renderInfoMessage(
			document.getElementById("uploadDocumentContainer"),
			"You can only upload a maximum of " + maxFiles + " files.",
			"danger"
		);
		return;
	}
	files.forEach(validateFile);
}

function checkStorageSize() {}

document.addEventListener("DOMContentLoaded", async () => {
	const navbar = document.getElementById("navbar");
	navbar.innerHTML = renderNavBar();

	const drawer = document.getElementById("drawer");
	drawer.innerHTML = renderDrawer("Documents");

	handleToogleDrawer();

	const dropArea = document.getElementById("drop-area");

	// Trigger file input when area is clicked
	dropArea.addEventListener("click", () => {
		fileInput.click();
	});

	// Prevent default behavior for drag and drop
	["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
		dropArea.addEventListener(eventName, preventDefaults, false);
		document.body.addEventListener(eventName, preventDefaults, false);
	});

	// Highlight drop area when file is dragged over
	["dragenter", "dragover"].forEach((eventName) => {
		dropArea.addEventListener(eventName, highlight, false);
	});

	["dragleave", "drop"].forEach((eventName) => {
		dropArea.addEventListener(eventName, unhighlight, false);
	});

	// Handle dropped files
	dropArea.addEventListener("drop", handleDrop, false);

	const fileInput = document.getElementById("fileInput");
	fileInput.addEventListener("change", () => {
		handleFiles(fileInput.files);
	});

	const uploadDocumentButton = document.getElementById("uploadDocumentButton");
	uploadDocumentButton.addEventListener("mouseup", handleUploadDocument);

	// checkStorageSize();
});
