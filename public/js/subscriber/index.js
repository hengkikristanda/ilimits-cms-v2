function handleAddTranslation() {
	const actionModal = document.getElementById("actionModal");
	actionModal.showModal();
}

async function loadData() {
	const subscriberDataTable = document.getElementById("subscriberDataTable");
	const tbody = subscriberDataTable.querySelector("tbody");

	try {
		const options = {
			timeout: 30000,
			method: "GET",
		};

		const response = await fetchWithTimeout("/crud/client/subscriber", options);

		if (!response.ok) {
			throw new Error("Failed to load data. Please try again later.");
		} else {
			const responseData = await response.json();

			const subscriberList = responseData.data;

			if (subscriberList.data) {
				subscriberList.data.map((item, index) => {
					const newRow = document.createElement("tr");
					newRow.className = "hover";

					const emailCol = document.createElement("td");
					emailCol.textContent = item.emailAddress;
					newRow.appendChild(emailCol);

					const sourceCol = document.createElement("td");
					sourceCol.classList.add("flex", "gap-2");
					sourceCol.textContent = item.source;

					/* languageOption.map((language) => {
						const lang = document.createElement("h6");
						lang.textContent = language.toUpperCase();
						lang.classList.add("bg-circle", "bg-circle-primary");
						sourceCol.appendChild(lang);
					});

					const addTranslation = document.createElement("h1");
					addTranslation.classList.add("bi", "bi-plus", "bg-circle", "bg-circle-action");
					addTranslation.addEventListener("mouseup", handleAddTranslation);
					sourceCol.appendChild(addTranslation); */

					newRow.appendChild(sourceCol);

					const dateCol = document.createElement("td");
					dateCol.textContent = formatDateToCustomString(item.createdAt);
					newRow.appendChild(dateCol);

					tbody.appendChild(newRow);
				});
			} else {
				throw new Error("No Data Found");
			}
		}
	} catch (error) {
		const newRow = document.createElement("tr");
		newRow.className = "hover";

		const numberCol = document.createElement("td");
		numberCol.textContent = error.message;
		numberCol.colSpan = 3;
		numberCol.classList.add("text-center", "text-baseGreen", "font-semibold");
		newRow.appendChild(numberCol);

		tbody.appendChild(newRow);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const navbar = document.getElementById("navbar");
	navbar.innerHTML = renderNavBar();

	const drawer = document.getElementById("drawer");
	drawer.innerHTML = renderDrawer("subscriber");

	loadData();

	handleToogleDrawer();
});
