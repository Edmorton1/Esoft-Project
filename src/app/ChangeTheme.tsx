import getMuiTheme from "@/app/getMuiTheme";
import { ThemeProvider } from "@emotion/react"
import { useEffect, useMemo, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createContext } from "react";

export const ThemeContext = createContext<() => void>(() => {})

function ChangeTheme({children}: {children: any}) {
  const [themeMode, setThemeMode] = useState<"light" | "dark">(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
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