async function handleSubmitUpdatePassword(event) {
	const submitButton = this.querySelector('button[type="submit"]');
	submitButton.disabled = true;
	submitButton.innerHTML = "<span class='loaderSmall'></span>";
	event.preventDefault();

	const oldPassword = this.querySelector("#oldPassword").value;
	const newPassword = this.querySelector("#newPassword").value;
	const confirmNewPassword = this.querySelector("#confirmNewPassword").value;

	try {
		if (newPassword != confirmNewPassword) {
			throw new Error("New Password Mismatch");
		}

		const options = {
			timeout: 30000,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ oldPassword, newPassword, confirmNewPassword }),
		};

		const response = await fetchWithTimeout("/auth/updatePassword", options);

		if (!response.ok) {
			const errorResponseData = await response.json();
			throw new Error(errorResponseData.message);
		} else {
			window.location.assign(response.url);
		}
	} catch (error) {
		enableButton(submitButton, "Login");
		if (error.name === "AbortError") {
			renderInfoMessage(this, getHttpStatusMessage(408), "danger");
		} else {
			renderInfoMessage(this, error.message, "danger");
		}
	}
}

async function handleSubmitUpdateProfile(event) {
	const submitButton = this.querySelector('button[type="submit"]');
	submitButton.disabled = true;
	submitButton.innerHTML = "<span class='loaderSmall'></span>";
	event.preventDefault();

	const firstName = this.querySelector("#firstName").value;
	const lastName = this.querySelector("#lastName").value;
	const email = this.querySelector("#email").value;
	const phone = this.querySelector("#phone").value;

	try {
		const options = {
			timeout: 30000,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ firstName, lastName, email, phone }),
		};

		const response = await fetchWithTimeout("/auth/updateUser", options);

		if (!response.ok) {
			const errorResponseData = await response.json();
			throw new Error(errorResponseData.message);
		}
		const responseData = await response.json();
		renderInfoMessage(this, responseData.message, "success");
		
	} catch (error) {
		if (error.name === "AbortError") {
			renderInfoMessage(this, getHttpStatusMessage(408), "danger");
		} else {
			renderInfoMessage(this, error.message, "danger");
		}
	} finally {
		enableButton(submitButton, "Update Profile");
		loadData();
	}
}

async function loadData() {
	const profileSettingContainer = document.getElementById("profileSettingContainer");
	try {
		const options = {
			timeout: 30000,
			method: "GET",
		};

		const response = await fetchWithTimeout("/crud/user/currentUser", options);

		if (!response.ok) {
			throw new Error("Failed to load data. Please try again later.");
		} else {
			const responseData = await response.json();

			const userDetail = responseData.data;
			if (userDetail) {
				profileSettingContainer.querySelector("#firstName").value = userDetail.firstName;
				profileSettingContainer.querySelector("#lastName").value = userDetail.lastName;
				profileSettingContainer.querySelector("#email").value = userDetail.email;
				profileSettingContainer.querySelector("#phone").value = userDetail.phone;
			} else {
				throw new Error("Failed to load data. Please try again later.");
			}
		}
	} catch (error) {
		if (error.name === "AbortError") {
			renderInfoMessage(profileSettingContainer, getHttpStatusMessage(408), "danger");
		} else {
			renderInfoMessage(profileSettingContainer, error.message, "danger");
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const navbar = document.getElementById("navbar");
	navbar.innerHTML = renderNavBar();

	const drawer = document.getElementById("drawer");
	drawer.innerHTML = renderDrawer("settings");

	loadData();

	const changePasswordForm = document.getElementById("changePasswordForm");
	changePasswordForm.addEventListener("submit", handleSubmitUpdatePassword);

	const updateProfileForm = document.getElementById("updateProfileForm");
	updateProfileForm.addEventListener("submit", handleSubmitUpdateProfile);

	handleToogleDrawer();
});
