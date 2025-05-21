import {createTheme} from "@mui/material/styles";

export const getMuiTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        // Основной цвет
        main: "#f54284",
      },
      background: {
        default: mode === "dark" ? "#242424" : "#fff",
        // Цвет карточек визуально выделяющихся компмонентов
        paper: mode === "dark" ? "#1d1d1d" : "#f5f5f5",
      },
    },
  });

export default getMuiTheme