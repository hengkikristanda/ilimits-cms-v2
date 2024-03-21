tinymce.init({
	selector: "#myTextArea",
	plugins: "image link lists media table",
	toolbar:
		"blocks fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent removeformat",
	automatic_uploads: false,
	image_description: false,
	image_uploadtab: false,
	images_upload_url: "/crud/uploads/attachedImage",
	images_upload_credentials: true,
	image_title: false,
	images_file_types: "jpg,webp,png",
	file_picker_types: "image",
	block_unsupported_drop: true,
	min_height: 1000,
	media_alt_source: false,
	media_live_embeds: true,

	file_picker_callback: (callback, value, meta) => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");

		input.addEventListener("change", (e) => {
			const file = e.target.files[0];

			uploadFile(file)
				.then(function (url) {
					// Call the callback with the URL of the uploaded image
					callback(url, {
						alt: file.name,
					});
				})
				.catch(function (error) {
					console.error("File upload failed:", error);
				});

			/*
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				const id = "blobid_" + new Date().getTime();
				const blobCache = tinymce.activeEditor.editorUpload.blobCache;
				const base64 = reader.result.split(",")[1];
				const blobInfo = blobCache.create(id, file, base64);
				blobCache.add(blobInfo);

				cb(blobInfo.blobUri(), { title: file.name });

				var formData = new FormData();
				formData.append("attachImage", file); // 'file' is the key your server-side script expects

				// Example using fetch to upload the file
				fetch("/crud/uploads/attachedImage", {
					// Replace with your actual upload URL
					method: "POST",
					body: formData,
					credentials: "include",
				})
					.then((response) => response.json())
					.then((data) => {
						if (data && data.imageUrl) {
							// Use the callback to insert the image URL into the editor
							callback(data.imageUrl, { alt: file.name });
						} else {
							// Handle server error or invalid response
							console.error("Failed to upload image");
						}
					})
					.catch((error) => {
						console.error("Error uploading file:", error);
					});
			});
			reader.readAsDataURL(file);
			*/
		});

		input.click();
	},
});

function uploadFile(file) {
	return new Promise((resolve, reject) => {
		var formData = new FormData();
		formData.append("attachImage", file); // Adjust 'file' if your API expects a different key

		fetch("/crud/uploads/attachedImage", {
			// Your backend file upload URL
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((result) => {
				if (result.url) {
					// Assuming the API responds with the URL of the uploaded file
					resolve(result.url);
				} else {
					reject("No URL in response");
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
}
