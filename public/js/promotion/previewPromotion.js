function createElementFromHTMLString(htmlString) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlString, "text/html");
	return doc.body.firstChild;
}

async function renderPreviewContent(previewPromotionContainer) {
	try {
		let previewContentData = localStorage.getItem("previewContentData");
		const previewContent = JSON.parse(previewContentData);

		const title = previewPromotionContainer.querySelector("h1");
		title.textContent = previewContent.previewTitle;

		const footNote = previewPromotionContainer.querySelector("h5");
		footNote.textContent = previewContent.previewFootNote;

		const subHeading = previewPromotionContainer.querySelector("h2");
		subHeading.textContent = previewContent.previewSubHeading;

		// console.log(removeOuterTags(previewContent.previewArticle, "p"));

		const ctaButton = previewPromotionContainer.querySelector("a");
		ctaButton.href = previewContent.previewCtaButtonLink;
		ctaButton.textContent = previewContent.previewCtaButtonLabel;

		const contentArticle = previewPromotionContainer.querySelector("h4");
		contentArticle.innerHTML = previewContent.previewArticle;
	} catch (error) {
		console.log(error);
		return false;
	}
	return true;
}

document.addEventListener("DOMContentLoaded", async () => {
	const previewPromotionContainer = document.getElementById("previewPromotionContainer");
	const isLoaded = await renderPreviewContent(previewPromotionContainer);
	if (isLoaded) {
		const imageData = localStorage.getItem("imageData");

		promiseLoadImage("tempImage", imageData)
			.then((loadedImage) => {
				const imageContainer = document.getElementById("imageDataContainer");
				imageContainer.classList.remove("hidden");
				imageContainer.appendChild(loadedImage.target);
			})
			.then(() => {
				const loaderImg = previewPromotionContainer.querySelector(".loaderImg");
				if (loaderImg) {
					loaderImg.remove();
				}
			});
	}
});
