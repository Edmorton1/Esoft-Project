import getMuiTheme from "@app/client/app/theme/theme";
import { ThemeProvider } from "@emotion/react"
import { useEffect, useMemo, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createContext } from "react";
import "@app/client/shared/css/global.scss"

export const ThemeContext = createContext<() => void>(() => {})

function ChangeTheme({children}: {children: any}) {
  const [themeMode, setThemeMode] = useState<"light" | "dark">(() => {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
    document.body.setAttribute('theme', themeMode)
  }, [themeMode]);

  const muiTheme = useMemo(() => getMuiTheme(themeMode), [themeMode]);

  const changeThemeFunc = () => setThemeMode(themeMode !== 'dark' ? "dark" : "light")

  return <ThemeProvider theme={muiTheme}>
    <ThemeContext.Provider value={changeThemeFunc}>
      <CssBaseline />
      {children}
    </ThemeContext.Provider>
  </ThemeProvider>
}

export default ChangeTheme