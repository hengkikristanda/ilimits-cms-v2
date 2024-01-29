async function handleResetPassword(event) {
	const resetPasswordForm = this;
	const submitButton = resetPasswordForm.querySelector('button[type="submit"]');
	submitButton.disabled = true;
	submitButton.innerHTML = "<span class='loaderSmall'></span>";
	event.preventDefault();

	const emailAddress = resetPasswordForm.querySelector("#emailAddress").value;
	try {
		const options = {
			timeout: 30000,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ emailAddress }),
		};

		const response = await fetchWithTimeout("/auth/requestResetPassword", options);

		if (!response.ok) {
			const responseData = await response.json();
			throw new Error(responseData.message);
		} else {
			const responseData = await response.json();
			renderInfoMessage(resetPasswordForm, responseData.message, "success");
			enableButton(submitButton, "Request Reset Password");
		}
	} catch (error) {
		enableButton(submitButton, "Request Reset Password");
		if (error.name === "AbortError") {
			renderInfoMessage(resetPasswordForm, getHttpStatusMessage(408), "danger");
		} else {
			console.log(error.message);
			renderInfoMessage(resetPasswordForm, error.message, "danger");
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const resetPasswordForm = document.getElementById("resetPasswordForm");
	resetPasswordForm.addEventListener("submit", handleResetPassword);
});
