const path = require("path");
const { REDIRECT_PAGE, REGISTERED_PAGE } = require("../utils/constants");
const userService = require("../services/usersServices");
const { calculateFolderSize } = require("../utils/commonUtils");

const registeredPages = {
	webSettings: "../view/webSettings/index.html",
};

const get = async (req, res) => {
	const notFoundPage = path.join(
		__dirname,
		CONSTANTS.PUBLIC_FOLDER_BASE_URL,
		REDIRECT_PAGE.NOT_FOUND
	);
	try {
		/* const requestedPage = req.params.page;
		const requestedSubPage = req.params.subPage;
		let targetPage = notFoundPage;

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

			// console.log("REQUESTED PAGE: ", requestedPage);
			// res.sendFile(targetPage);
			// res.redirect(requestedPage);
			res.sendFile("home/index.html");
			
		} else {
			throw new Error("404 Not Found");
		} */
		console.log("HERE: ", notFoundPage);
		// res.redirect(notFoundPage);

		const p = path.join(__dirname, "../../public/home", "index.html");
		console.log(p);
		res.sendFile(p);
	} catch (error) {
		console.log(error);
		res.sendFile(notFoundPage);
	}
};

const getHomePage = async (req, res) => {
	try {
		const targetPage = path.join(__dirname, `../view/home/index.html`);
		res.sendFile(targetPage);
	} catch (error) {
		console.log(error);
		res.sendFile(notFoundPage);
	}
};

const getAccountSettings = async (req, res) => {
	try {
		// console.log(req.user);
		/* let existingUser;
		const userId = req.cookies.active_userId;
		if (userId) {
			existingUser = await userService.getUser(userId);
			if (existingUser && existingUser.success) {
				console.log(existingUser);
			}
		}

		const targetPage = path.join(__dirname, `../view/accountSettings/index.html`, { existingUser });
		res.sendFile(targetPage); */

		const targetPage = path.join(__dirname, `../view/accountSettings/index.html`);
		res.sendFile(targetPage);
	} catch (error) {
		console.log(error);
		res.redirect("/notfound");
	}
};

const dispatch = async (req, res) => {
	try {
		const requestedPath = req.path.slice(1);

		const htmlPage = registeredPages[requestedPath];

		const targetPage = path.join(__dirname, `${htmlPage}`);
		res.sendFile(targetPage);
	} catch (error) {
		console.log(error);
		res.redirect("/notfound");
	}
};

const getWebPagesFooter = async (req, res) => {
	try {
		const targetPage = path.join(__dirname, `../view/footer/index.html`);
		res.sendFile(targetPage);
	} catch (error) {
		console.log(error);
		res.redirect("/notfound");
	}
};

const getSubscriber = async (req, res) => {
	try {
		const targetPage = path.join(__dirname, `../view/subscriber/index.html`);
		res.sendFile(targetPage);
	} catch (error) {
		console.log(error);
		res.redirect("/notfound");
	}
};

const getPromotions = async (req, res) => {
	try {
		const targetPage = path.join(__dirname, `../view/promotions/index.html`);
		res.sendFile(targetPage);
	} catch (error) {
		console.log(error);
		res.sendFile(notFoundPage);
	}
};

const getCreatePromotionPage = async (req, res) => {
	try {
		const targetPage = path.join(__dirname, `../view/promotions/create-promotion.html`);
		res.sendFile(targetPage);
	} catch (error) {
		console.log(error);
		res.sendFile(notFoundPage);
	}
};

const getUpdatePromotionPage = async (req, res) => {
	try {
		// const contentId = req.params.contentId;
		const targetPage = path.join(__dirname, `../view/promotions/update-promotion.html`);
		res.sendFile(targetPage);
	} catch (error) {
		console.log(error);
		res.sendFile(notFoundPage);
	}
};

const getPreviewPromotionPage = async (req, res) => {
	try {
		const targetPage = path.join(__dirname, `../view/promotions/preview-promotion.html`);
		res.sendFile(targetPage);
	} catch (error) {
		console.log(error);
		res.sendFile(notFoundPage);
	}
};

const getPublicDocs = async (req, res) => {
	try {
		const targetPage = path.join(__dirname, `../view/publicDocs/index.html`);
		res.sendFile(targetPage);
	} catch (error) {
		console.log(error);
		res.sendFile(notFoundPage);
	}
};

const getUploadPublicDocs = async (req, res) => {
	try {
		const targetPage = path.join(__dirname, `../view/publicDocs/uploads.html`);
		res.sendFile(targetPage);
	} catch (error) {
		console.log(error);
		res.sendFile(notFoundPage);
	}
};

const getStorageSize = async (req, res) => {
	try {
		const folderPath = path.join("public", "assets", "docs");

		const remainingSize = calculateFolderSize(folderPath);
		console.log(remainingSize.substring(0, 4));

		res.status(200).json({
			total: "1GB",
			remaining: remainingSize.substring(0, 4),
		});
	} catch (error) {
		console.log(error);
		res.sendFile(notFoundPage);
	}
};

const getTest = async (req, res) => {
	try {
		const targetPage = path.join(__dirname, `../view/test.html`);
		res.sendFile(targetPage);
	} catch (error) {
		console.log(error);
		res.sendFile(notFoundPage);
	}
};

module.exports = {
	getHomePage,
	getAccountSettings,
	getPromotions,
	getCreatePromotionPage,
	getUpdatePromotionPage,
	getPreviewPromotionPage,
	getSubscriber,
	getTest,
	getPublicDocs,
	getUploadPublicDocs,
	getWebPagesFooter,
	dispatch,
};
