import { ThemeContext } from "@app/client/app/theme/ChangeTheme"
import { useContext } from "react"
import Button from "@mui/material/Button";

function ThemeButton() {
  const handleClick = useContext(ThemeContext)

  return <Button variant="contained" color={"primary"} onClick={handleClick}>Сменить тему</Button>
}

export default ThemeButton