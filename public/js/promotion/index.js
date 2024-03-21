async function handleDelete(itemId, itemName) {
	const alertModal = document.getElementById("alertModal");
	alertModal.innerHTML = await alertModalComponent(itemId, itemName, MODAL_ALERT.DELETE);

	const confirmDeleteButton = document.getElementById("confirmDelete_" + itemId);
	confirmDeleteButton.addEventListener("mouseup", handleConfirmDelete);

	alertModal.showModal();
}

async function handleConfirmDelete(event) {
	const contentId = event.target.id.split("_")[1];

	const options = {
		timeout: 30000,
		method: "DELETE",
	};

	const apiEndPoint = `/crud/content/promotion/${contentId}`;

	const callBackAction = () => {
		const removedContent = document.getElementById("group_" + contentId);
		if (removedContent) {
			removedContent.remove();
		}
	};

	await sendRequest(apiEndPoint, options, MODAL_ACTION.DELETE, null, callBackAction);
}

async function loadData() {
	try {
		const options = {
			timeout: 30000,
			method: "GET",
		};

		const response = await fetchWithTimeout("/crud/content/promotion", options);

		if (!response.ok) {
			throw new Error("Failed to load data. Please try again later.");
		} else {
			const responseData = await response.json();

			const contentList = responseData.data;

			const rowsBlockContainer = document.getElementById("rowsBlockContainer");

			if (contentList.data && contentList.data.length > 0) {
				contentList.data.map((item, index) => {
					const badgeClass = item.contentStatus === "draft" ? "mybadge" : "mybadge mybadge-primary";

					const tempDiv = document.createElement("div");
					tempDiv.id = `group_${item.id}`;
					tempDiv.classList.add("group", "rows-block");

					tempDiv.innerHTML = [
						`<div class="flex flex-col w-3/4 gap-1 overview">`,
						`	<h5 class="heading">${item.heading}</h5>`,
						`	<h6 class="subHeading">${item.subHeading}</h6>`,
						`	<h6 class="metaText">${item.footNote}</h6>`,
						`</div>`,
						`<div class="flex flex-col w-1/4 items-end text-end gap-1 group-hover:hidden">`,
						`	<span class="${badgeClass}">${item.contentStatus}</span>`,
						`	<h6 class="metaText">Last Modified by ${item.userId}</h6>`,
						`	<h6 class="metaText">${formatDateToCustomString(item.lastModifiedDate)}</h6>`,
						`</div>`,
						`<div class="flex w-1/4 justify-end hidden group-hover:flex">`,
						`	<div class="flex bg-gray-100 h-fit rounded-md border border-gray-100 hover:border-baseGreen cursor-pointer">`,
						`		<a id="${item.id}" class="text-lg bi bi-trash-fill py-px px-2" title="Delete"></a>`,
						`	</div>`,
						`</div>`,
					].join("");

					rowsBlockContainer.appendChild(tempDiv);

					const updateContentIcon = tempDiv.querySelector(".overview");
					updateContentIcon.addEventListener("mouseup", (event) => {
						window.location.href = `/pages/promotions/updatePromotion/${item.id}`;
					});

					const deleteContentIcon = tempDiv.querySelector("a");
					deleteContentIcon.addEventListener("mouseup", () => handleDelete(item.id, item.heading));
				});
				return true;
			} else {
				const tempDiv = document.createElement("div");
				tempDiv.innerHTML = [
					`<div class="rows-block justify-center text-center">`,
					`	<p class="text-primary">No Data Found</p>`,
					`</div>`,
				].join("");

				rowsBlockContainer.appendChild(tempDiv);
				return false;
			}
		}
	} catch (error) {
		/* const newRow = document.createElement("tr");
		newRow.className = "hover";

		const numberCol = document.createElement("td");
		numberCol.textContent = error.message;
		numberCol.colSpan = 3;
		numberCol.classList.add("text-center", "text-baseGreen", "font-semibold");
		newRow.appendChild(numberCol);

		tbody.appendChild(newRow); */
		console.log(error);
		return false;
	}

	/* return [
		`<div class="rows-block">`,
		`	<h4>${heading}</h4>`,
		`	<p>${textContent}</p>`,
		`	<h6>${footNote}</h6>`,
		`	<div><span class="mybadge">Draft</span><h6>Last Modified by ${modifiedBy} @ ${modifiedAt}</h6></div>`,
		`</div>`,
	].join(""); */
}

document.addEventListener("DOMContentLoaded", async () => {
	handleInputSearchBox();

	const navbar = document.getElementById("navbar");
	navbar.innerHTML = renderNavBar();

	const drawer = document.getElementById("drawer");
	drawer.innerHTML = renderDrawer("promotions");

	handleToogleDrawer();

	const isLoaded = await loadData();

	const loadingModal = document.getElementById("loadingModal");
	loadingModal.innerHTML = loadingProcessComponent();

	/* const infoMessage = localStorage.getItem("info-message");
	if (infoMessage) {
		const rowsBlockContainer = document.getElementById("rowsBlockContainer");
		renderInfoMessage(rowsBlockContainer, infoMessage, "success");
		localStorage.clear();
	} */
});
