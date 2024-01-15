function PromotionDetailSectionComponent(contentData) {
	const {
		contentTitle,
		contentSubHeading,
		contentFootNote,
		contentStartDate,
		contentEndDate,
		contentArticle,
	} = contentData;

	return [
		`<h1 class="pt-4 font-bold text-5xl">${contentTitle}</h1>`,
		`<h5 class="py-4 font-semibold">${contentFootNote}</h5>`,
		// `<img src=data:${imageContentType};base64,${imageRef} alt="${title}" loading="lazy" />`,
		`<div id="imageDataContainer" class="loaderImg mx-auto w-full"></div>`,
		`<h2 class="pt-2 text-baseGreen font-semibold">${contentSubHeading}</h2>`,
		`<h4 class="py-4">${contentArticle}</h4>`,
	].join("");
}

function renderDetailContent(contentData) {
	const myContainer = document.getElementById("preview");
	myContainer.innerHTML = PromotionDetailSectionComponent(contentData);

	// promiseLoadImage(contentData.defaultEndPoint + contentData.imageId).then((loadedImage) => {
	// 	const imageContainer = document.getElementById(contentData.imageId);
	// 	const loader = imageContainer.classList.remove("loaderImg");
	// 	imageContainer.appendChild(loadedImage.target);
	// });

	const imageData = localStorage.getItem("imageData");

	if (imageData) {
		const imageElement = document.createElement("img");
		imageElement.src = imageData;

		const imageDataContainer = document.getElementById("imageDataContainer");
		imageDataContainer.appendChild(imageElement); // Append the image to the body or any specific container
		imageDataContainer.classList.remove("loaderImg");
	}
}

function SectionPlaceholderComponent() {
	return [
		`<div id="promotionDetailContainer" class="promotionDetailContainer">`,
		`	<div class="loaderImg mx-auto"></div>`,
		`	<div class="loader5 mx-auto"></div>`,
		`</div>`,
	].join("");
}

document.addEventListener("DOMContentLoaded", () => {
	let previewContentData = localStorage.getItem("previewContentData");
	const content = JSON.parse(previewContentData);

	const myContainer = document.getElementById("preview");
	myContainer.innerHTML = SectionPlaceholderComponent();

	renderDetailContent(content);
});
