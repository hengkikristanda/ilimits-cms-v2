function removeLoader() {
	const documentsTableData = document.getElementById("documentsTableData");
	documentsTableData.deleteRow(1);
}

function handleDelete(id, fileName) {
	const alertModal = document.getElementById("alertModal");

	const alertTitle = alertModal.getElementsByTagName("h3");
	const alertMessage = alertModal.getElementsByTagName("p");
	alertTitle[0].textContent = `Are you sure you want to delete this file ${fileName}?`;
	alertMessage[0].textContent = "This action cannot be undone.";

	const buttonModal = alertModal.querySelectorAll("#modalButtonContainer button")[1];
	buttonModal.id = id;
	buttonModal.classList.remove("hidden");
	buttonModal.innerHTML = "Yes, Delete This File";

	alertModal.showModal();
}

function handleCopyText() {
	navigator.clipboard
		.writeText(this.textContent)
		.then(() => {
			const toast = document.getElementById("toast");
			toast.innerHTML = renderToast(`Text copied to clipboard: ${this.textContent}`);
			toast.style.display = "flex";

			setTimeout(() => {
				toast.style.display = "none";
			}, 1500);
		})
		.catch((err) => {
			console.error("Unable to copy text to clipboard", err);
		});
}

async function loadData() {
	const documentsTableData = document.getElementById("documentsTableData");
	const tbody = documentsTableData.querySelector("tbody");

	try {
		const options = {
			timeout: 30000,
			method: "GET",
		};

		const response = await fetchWithTimeout("/crud/publicDocs", options);

		if (!response.ok) {
			throw new Error("Failed to load data. Please try again later.");
		} else {
			const responseData = await response.json();

			if (responseData.success && responseData.data) {
				const documentList = responseData.data.documentList;
				if (documentList) {
					documentList.map((item, index) => {
						const newRow = document.createElement("tr");
						newRow.className = "hover";

						const actionCol = document.createElement("td");
						actionCol.innerHTML = '<a class="bi bi-trash-fill" href="#"></a>';
						newRow.appendChild(actionCol);

						actionCol.addEventListener("mouseup", () => handleDelete(item.id, item.fileName));

						const fileNameCol = document.createElement("td");

						const fileNamePreview = document.createElement("a");
						fileNamePreview.textContent = item.originalFileName;
						fileNamePreview.target = "blank";
						fileNamePreview.href = `/assets/docs/${item.originalFileName}`;
						fileNamePreview.title = "Click to View The Document";

						fileNameCol.classList.add("text-link");
						fileNameCol.appendChild(fileNamePreview);
						newRow.appendChild(fileNameCol);

						const hrefCol = document.createElement("td");

						hrefCol.textContent = item.id;
						hrefCol.classList.add("text-link");
						hrefCol.title = "Click to Copy The URL";
						newRow.appendChild(hrefCol);

						hrefCol.addEventListener("mouseup", handleCopyText);

						const uploaderCol = document.createElement("td");
						uploaderCol.textContent = item.createdBy;
						newRow.appendChild(uploaderCol);

						const dateCol = document.createElement("td");
						dateCol.textContent = formatDateToCustomString(item.uploadedDate);
						newRow.appendChild(dateCol);

						tbody.appendChild(newRow);
					});
				} else {
					throw new Error("No Data Found");
				}
			} else {
				throw new Error("No Data Found");
			}
		}
	} catch (error) {
		const newRow = document.createElement("tr");
		newRow.className = "hover";

		const numberCol = document.createElement("td");
		numberCol.textContent = error.message;
		numberCol.colSpan = 5;
		numberCol.classList.add("text-center", "text-baseGreen", "font-semibold");
		newRow.appendChild(numberCol);

		tbody.appendChild(newRow);

		removeLoader();
		return false;
	}
	return true;
}

async function handleDeleteSelectedDocument(event) {
	const documentId = event.target.id;

	const documentTableContainer = document.getElementById("documentTableContainer");
	try {
		const options = {
			timeout: 30000,
			method: "DELETE",
		};
		const response = await fetchWithTimeout(`/crud/publicDocs/${documentId}`, options);

		if (!response.ok) {
			throw new Error("Failed to remove document. Please try again later.");
		}

		
		const tbody = documentTableContainer.querySelector("tbody");
		while (tbody.firstChild) {
			tbody.removeChild(tbody.firstChild);
		}
		const isLoaded = await loadData();

		const responseData = await response.json();
		renderInfoMessage(documentTableContainer, responseData.message, "success");
	} catch (error) {
		if (error.name === "AbortError") {
			renderInfoMessage(documentTableContainer, getHttpStatusMessage(408), "danger");
		} else {
			renderInfoMessage(documentTableContainer, error.message, "danger");
		}
	}
}

document.addEventListener("DOMContentLoaded", async () => {
	const navbar = document.getElementById("navbar");
	navbar.innerHTML = renderNavBar();

	const drawer = document.getElementById("drawer");
	drawer.innerHTML = renderDrawer("Documents");

	const isLoaded = await loadData();
	if (isLoaded) {
		removeLoader();
		const deleteConfirmationForm = document.getElementById("deleteConfirmationForm");
		const confirmDeleteAction = deleteConfirmationForm.querySelectorAll("button")[1];
		confirmDeleteAction.addEventListener("mouseup", handleDeleteSelectedDocument);
	}

	handleToogleDrawer();
});
