/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./public/**/*.{html,js}"],
	theme: {
		container: {
			padding: {
				DEFAULT: "1rem",
				sm: "1rem",
				lg: "1rem",
				xl: "1rem",
				"2xl": "1rem",
			},
		},
		screen: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		extend: {
			colors: {
				baseGreen: "hsl(115, 43%, 52%)",
				baseOrange: "hsl(36, 97%, 62%)",
			},
			maxWidth: {
				"1/3": "33%",
				10: "10px",
			},
			height: {
				480: "30rem",
				640: "40rem",
				768: "48rem",
				800: "50rem",
				960: "60rem",
				1040: "65rem",
				1200: "75rem",
				1536: "96rem",
				7680: "480rem",
			},
			width: {
				480: "30rem",
				1200: "75rem",
				4800: "300rem",
			},
		},
	},
	plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
	daisyui: {
		themes: ["light"],
	},
};
