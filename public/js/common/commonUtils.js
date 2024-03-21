let languageOption = ["en", "id", "my"];

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

// 2.
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

// 1.
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

function getHttpStatusMessage(statusCode) {
	const statusMessages = {
		100: "Continue",
		101: "Switching Protocols",
		200: "OK",
		201: "Created",
		204: "No Content",
		400: "Bad Request",
		401: "Authentication Required",
		403: "Forbidden",
		404: "Not Found",
		408: "Request Timeout",
		500: "Internal Server Error",
		503: "Service Unavailable",
	};

	return statusMessages[statusCode] || null;
}

async function fetchWithTimeout(url, options) {
	const { timeout = 30000 } = options;

	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);
	options.signal = controller.signal;
	const response = await fetch(url, options);
	clearTimeout(id);
	return response;
}

function formatDateToCustomString(dateString) {
	return new Date(dateString).toLocaleString("en-US", {
		// weekday: "long",
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	});
}

function sortTable(n, tableId, isDateTime = false) {
	var table,
		rows,
		switching,
		i,
		x,
		y,
		shouldSwitch,
		dir,
		switchcount = 0;
	table = document.getElementById(tableId);
	switching = true;
	//Set the sorting direction to ascending:
	dir = "asc";
	/*Make a loop that will continue until
	no switching has been done:*/
	while (switching) {
		//start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		/*Loop through all table rows (except the
	  first, which contains table headers):*/
		for (i = 1; i < rows.length - 1; i++) {
			//start by saying there should be no switching:
			shouldSwitch = false;
			/*Get the two elements you want to compare,
		one from current row and one from the next:*/
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			/*check if the two rows should switch place,
		based on the direction, asc or desc:*/
			if (!isDateTime) {
				if (dir == "asc") {
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						//if so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				} else if (dir == "desc") {
					if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						//if so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				}
			} else {
				let dateA = parseCustomDate(x.innerHTML);
				let dateB = parseCustomDate(y.innerHTML);

				if (dir == "asc") {
					if (dateA - dateB > 0) {
						//if so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				} else if (dir == "desc") {
					if (dateA - dateB < 0) {
						//if so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				}
			}
		}
		if (shouldSwitch) {
			/*If a switch has been marked, make the switch
		and mark that a switch has been done:*/
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			//Each time a switch is done, increase this count by 1:
			switchcount++;
		} else {
			/*If no switching has been done AND the direction is "asc",
		set the direction to "desc" and run the while loop again.*/
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}

function parseCustomDate(dateString) {
	var regex = /(\w+), (\w+) (\d+), (\d+) at (\d+):(\d+):(\d+) (\w+)/;
	var [, day, month, dayNum, year, hour, minute, second, meridian] = dateString.match(regex);

	var monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Octr",
		"Nov",
		"Dec",
	];

	var monthIndex = monthNames.indexOf(month);

	if (meridian === "PM" && parseInt(hour, 10) !== 12) {
		hour = (parseInt(hour, 10) + 12).toString();
	} else if (meridian === "AM" && parseInt(hour, 10) === 12) {
		hour = "00";
	}

	return new Date(year, monthIndex, dayNum, hour, minute, second);
}

function promiseLoadImage(imageId, imageSrc, classList) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.att;
		img.onload = resolve;
		img.onerror = reject;
		img.id = imageId;
		img.src = imageSrc;
		if (classList) {
			classList.map((className) => {
				img.classList.add(className);
			});
		}
	});
}

function getPathVariable(pathname) {
	const segments = pathname.split("/");
	const value = segments[segments.length - 1];
	return value;
}

async function sendRequest(apiEndPoint, options, modalAction, redirectPage, callBackAction) {
	const loadingModal = document.getElementById("loadingModal");
	const actionResponse = {
		isSuccess: true,
		redirectPage,
	};

	try {
		startLoader(loadingModal, modalAction, actionResponse);

		const response = await fetchWithTimeout(apiEndPoint, options);

		if (!response.ok) {
			const errorResponse = await response.json();
			throw new Error(`${errorResponse.message}. Please try again later.`);
		}
	} catch (error) {
		actionResponse.isSuccess = false;
		actionResponse.reason = error.message;
		if (error.name === "AbortError") {
			actionResponse.reason = "Request Time Out";
		}
	} finally {
		setTimeout(() => {
			if (callBackAction) {
				callBackAction();
			}
			stopLoader(loadingModal, modalAction, actionResponse);
		}, 100);
	}
}

async function preloadData(apiEndPoint, options, callBackAction) {
	/* const loadingModal = document.getElementById("loadingModal");
	const actionResponse = {
		isSuccess: true,
		redirectPage,
	}; */

	try {
		// startLoader(loadingModal, modalAction, actionResponse);

		const response = await fetchWithTimeout(apiEndPoint, options);

		if (!response.ok) {
			// throw new Error(`${modalAction.ON_FAILED}. Please try again later.`);
		}
	} catch (error) {
		/* console.log(error);
		actionResponse.isSuccess = false;
		actionResponse.reason = "Something went wrong";
		if (error.name === "AbortError") {
			actionResponse.reason = "Request Time Out";
		} */
	} finally {
		/* setTimeout(() => {
			if (callBackAction) {
				callBackAction();
			}
			stopLoader(loadingModal, modalAction, actionResponse);
		}, 1000); */
	}
}

function removeOuterTags(str, tagName) {
	const openingTagRegex = new RegExp(`^<${tagName}>`, "i");
	const closingTagRegex = new RegExp(`</${tagName}>$`, "i");
	return str.replace(openingTagRegex, "").replace(closingTagRegex, "");
}

function handleSwitchChanges(event) {}

function handleSwitch() {
	const checkboxes = document.querySelectorAll('input[type="checkbox"]');
	checkboxes.forEach((checkBox) => {
		checkBox.addEventListener("change", handleSwitchChanges);
	});
}

function getCookie(cookieName) {
	let cookie = {};
	document.cookie.split(";").forEach(function (el) {
		let [key, value] = el.split("=");
		cookie[key.trim()] = value;
	});
	return cookie[cookieName];
}
