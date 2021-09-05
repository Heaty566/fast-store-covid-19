const theme = require("tailwindcss/defaultTheme");

module.exports = {
        purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
        darkMode: false, // or 'media' or 'class'
        theme: { spacing: { ...theme.spacing, 101: "25.25rem" }, extend: {} },
        variants: {
                extend: {},
        },
        plugins: [],
};
