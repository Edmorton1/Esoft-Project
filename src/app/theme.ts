import {createTheme, Theme} from "@mui/material/styles";

export const getMuiTheme = (mode: "light" | "dark"): Theme => {
	let theme = createTheme({
		palette: {
			mode,
			primary: {
				// Основной цвет
				main: "#7F00FF",
			},
			background: {
				default: mode === "dark" ? "#242424" : "#fff",
				// Цвет карточек визуально выделяющихся компмонентов
				paper: mode === "dark" ? "#1d1d1d" : "#f5f5f5",
			},
		},
	});
	theme = createTheme(theme, {
		palette: {
			salmon: theme.palette.augmentColor({
				color: {
					main: "#ffffff",
				},
				name: "salmon",
			}),
		},
	});

	return theme;
};

export default getMuiTheme;
