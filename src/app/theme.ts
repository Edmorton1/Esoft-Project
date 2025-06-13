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
				default: mode === "dark" ? "#242424" : "#e6e6e6",
				//@ts-ignore
				third: mode === 'dark' ? "#2b2b2b" : "#fcfcfc",
				//@ts-ignore
				alt: mode === 'dark' ? "#303030" : "#f2f2f2",
				// Цвет карточек визуально выделяющихся компмонентов
				paper: mode === "dark" ? "#333333" : "#ffffff",
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
