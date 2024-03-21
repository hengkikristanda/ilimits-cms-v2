// const emailModel = require("../model/emailModel");
const { REGISTERED_ROUTES } = require("../utils/constants");

const send = async (req, res) => {
	/* const emailPurpose = req.params.purpose;

	if (emailPurpose && REGISTERED_ROUTES.includes(emailPurpose)) {
		const { email } = req.body;
		let result;
		if (!email) {
			return res.status(400).send("Email address is required");
		}

		if (emailPurpose === "test") {
			result = await emailModel.sendTestEmail(email);
		} else if (emailPurpose === "resetPassword") {
            result = await emailModel.sendResetPasswordEmail(email);
		}
		if (result.success) {
			return res.status(200).send(result.message);
		} else {
			return res.status(500).send(result.message);
		}
	}
	return res.status(500).send("Invalid Route"); */
};

module.exports = { send };
