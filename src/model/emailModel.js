const nodemailer = require("nodemailer");
require("dotenv").config();

const transporterNoReply = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: true,
	auth: {
		user: process.env.SMTP_USER_NOREPLY,
		pass: process.env.SMTP_PASS_NOREPLY,
	},
});

const sendTestEmail = async (email) => {
	const mailOptions = {
		from: "noreply@soliditi.tech",
		to: email,
		subject: "Example Email",
		text: "This is an example email.",
	};

	try {
		const info = await transporterNoReply.sendMail(mailOptions);
		console.log("Email sent:", info.response);
		return { success: true, message: "Email sent successfully!" };
	} catch (error) {
		console.error("Error sending email:", error);
		return { success: false, message: "Error sending email" };
	}
};

const sendResetPasswordEmail = async (email) => {
	const mailOptions = {
		from: "noreply@soliditi.tech",
		to: email,
		subject: "Reset Password",
		text: "Your new password is: jff30qjf03jgje",
	};

	try {
		const info = await transporterNoReply.sendMail(mailOptions);
		console.log("Email sent:", info.response);
		return { success: true, message: "Email sent successfully!" };
	} catch (error) {
		console.error("Error sending email:", error);
		return { success: false, message: "Error sending email" };
	}
};

module.exports = { sendTestEmail, sendResetPasswordEmail };
