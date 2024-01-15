const path = require("path");
const { CONSTANTS, REDIRECT_PAGE, REGISTERED_PAGE } = require("../utils/constants");

const get = async (req, res) => {
	const nonFoundPage = path.join(
		__dirname,
		CONSTANTS.PUBLIC_FOLDER_BASE_URL,
		REDIRECT_PAGE.NOT_FOUND
	);
	try {
		const requestedPage = req.params.page;
		const requestedSubPage = req.params.subPage;
		let targetPage = nonFoundPage;

		if (requestedPage && REGISTERED_PAGE.includes(requestedPage)) {
			targetPage = path.join(
				__dirname,
				CONSTANTS.PUBLIC_FOLDER_BASE_URL,
				`${requestedPage}/index.html`
			);

			if (requestedSubPage && REGISTERED_PAGE.includes(requestedSubPage)) {
				targetPage = path.join(
					__dirname,
					CONSTANTS.PUBLIC_FOLDER_BASE_URL,
					`${requestedPage}/${requestedSubPage}.html`
				);
			}
			res.sendFile(targetPage);
		} else {
			throw new Error("404 Not Found");
		}
	} catch (error) {
		console.log(error);
		res.sendFile(nonFoundPage);
	}
};

module.exports = { get };
