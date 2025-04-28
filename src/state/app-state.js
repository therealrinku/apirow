const { state } = window.rowanjs;

export const currentApp = state(null); // api_client, sql_client, null(means homepage)

export const isDarkMode = state(localStorage.getItem("darkMode") === "yes");
