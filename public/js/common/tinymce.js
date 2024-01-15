tinymce.init({
	selector: "#myTextArea",
	plugins: "image link lists media table checklist",
	toolbar:
		"blocks fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent removeformat",
	automatic_uploads: true,
	image_description: false,
	image_uploadtab: false,
	images_upload_url: "/context/uploader",
	image_title: false,
	images_file_types: "jpg,webp,png",
	file_picker_types: "image",
	block_unsupported_drop: false,
	media_alt_source: false,
	media_live_embeds: true,
	file_picker_callback: (cb, value, meta) => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");

		input.addEventListener("change", (e) => {
			const file = e.target.files[0];

			const reader = new FileReader();
			reader.addEventListener("load", () => {
				const id = "blobid_" + new Date().getTime();
				const blobCache = tinymce.activeEditor.editorUpload.blobCache;
				const base64 = reader.result.split(",")[1];
				const blobInfo = blobCache.create(id, file, base64);
				blobCache.add(blobInfo);

				cb(blobInfo.blobUri(), { title: file.name });
			});
			reader.readAsDataURL(file);
		});

		input.click();
	},
});
