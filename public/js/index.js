async function handleLogin(event) {
	const loginForm = document.getElementById("loginForm");

	const submitButton = loginForm.querySelector('button[type="submit"]');
	submitButton.disabled = true;
	submitButton.innerHTML = "<span class='loaderSmall'></span>";
	event.preventDefault();

	const username = loginForm.querySelector("#username").value;
	const password = loginForm.querySelector("#password").value;

	try {
		const options = {
			timeout: 30000,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		};

		const response = await fetchWithTimeout("/auth/login", options);

		if (!response.ok) {
			const responseData = await response.json();
			throw new Error(responseData.message);
		} else {
			window.location.assign(response.url);
		}
	} catch (error) {
		enableButton(submitButton, "Login");
		if (error.name === "AbortError") {
			renderInfoMessage(loginForm, getHttpStatusMessage(408), "danger");
		} else {
			renderInfoMessage(loginForm, error.message, "danger");
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const loginForm = document.getElementById("loginForm");
	loginForm.addEventListener("submit", handleLogin);

	const errorCode = new URLSearchParams(window.location.search).get("error");
	let errorMessage = getHttpStatusMessage(errorCode);
	if (errorMessage) {
		let badgeType = "danger";
		if (errorCode == 403) {
			errorMessage += ": Account is locked!";
		} else if (errorCode == 200) {
			badgeType = "success";
			errorMessage = "Password successfully updated. Please login again."
		}
		renderInfoMessage(loginForm, errorMessage, badgeType);
	}
});
