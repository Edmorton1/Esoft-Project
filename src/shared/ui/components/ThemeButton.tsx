import { ThemeContext } from "@/app/theme/ChangeTheme"
import MinButton, { sxMinButton } from "@/shared/ui/MinButton"
import { useContext } from "react"
import ContrastIcon from '@mui/icons-material/Contrast';
import { sxStyle } from "@/shared/ui/CircleButton";
import Button from "@mui/material/Button";
import DarkModeIcon from '@mui/icons-material/DarkMode';

function ThemeButton() {
  const handleClick = useContext(ThemeContext)

  return <Button variant="contained" color={"primary"} onClick={handleClick}>Сменить тему</Button>
}

export default ThemeButton