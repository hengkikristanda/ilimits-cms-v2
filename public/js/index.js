document.addEventListener("DOMContentLoaded", () => {
	const loginForm = document.getElementById("loginForm");
	loginForm.addEventListener("submit", async (event) => {
		const submitButton = loginForm.querySelector('button[type="submit"]');
		submitButton.disabled = true;
		submitButton.innerHTML = "<span class='loader6'></span>";
		event.preventDefault();

		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;

		try {
			const response = await fetch("/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			setTimeout(() => {
				if (response.ok) {
					window.location.href = "/context/home/"; // Redirect to dashboard page
				} else {
					const errorMessage = data.message || "Login failed";
					document.getElementById("error-message").innerText = errorMessage;
					document.getElementById("error-message").style.display = "block";

					submitButton.innerHTML = "Login";
					submitButton.disabled = false;
				}
			}, 500);
		} catch (error) {
			console.error("Error:", error);
			document.getElementById("error-message").innerText =
				"An error occurred. Please try again later.";
			document.getElementById("error-message").style.display = "block";
		}
	});
});
