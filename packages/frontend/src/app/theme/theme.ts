import {createTheme, Theme} from "@mui/material/styles";

export const getMuiTheme = (mode: "light" | "dark"): Theme => {
	let theme = createTheme({
		palette: {
			mode,
			info: {
				main: "#FF8E53"
			},
			primary: {
				// Основной цвет
				main: "#7F00FF",
			},
			background: {
				default: mode === "dark" ? "#242424" : "#e6e6e6",
				third: mode === 'dark' ? "#2b2b2b" : "#f5f5f5",
				alt: mode === 'dark' ? "#303030" : "#f2f2f2",
				// Цвет карточек визуально выделяющихся компмонентов
				paper: mode === "dark" ? "#333333" : "#ffffff",
			},
		},
	});
	theme = createTheme(theme, {
		palette: {
			plombir: theme.palette.augmentColor({
				color: {
					main: "#ffffff",
				},
				name: "plombir",
			}),
		},
	});

	return theme;
};

export default getMuiTheme;

// 	#fff33f - Жёлтый
// #7F00FF - Лиловый
// #FF8E53 - Персик