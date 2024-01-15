const CONSTANTS = {
	PUBLIC_FOLDER_BASE_URL: "../../public",
};

const REDIRECT_PAGE = {
	NOT_FOUND: "404.html",
};

const HTTP_STATUS_CODES = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
	// Add more status codes as needed
};

const REGISTERED_PAGE = ["home", "promotion", "create-promotion"];
const REGISTERED_ROUTES = ["test", "resetPassword"];
module.exports = {
	CONSTANTS,
	REDIRECT_PAGE,
	REGISTERED_PAGE,
	HTTP_STATUS_CODES,
	REGISTERED_ROUTES,
};
