import { ThemeContext } from "@/app/theme/ChangeTheme"
import MinButton, { sxMinButton } from "@/shared/ui/kit/MinButton"
import { useContext } from "react"
import ContrastIcon from '@mui/icons-material/Contrast';
import { sxStyle } from "@/shared/ui/kit/CircleButton";
import Button from "@mui/material/Button";
import DarkModeIcon from '@mui/icons-material/DarkMode';

function ThemeButton() {
  const handleClick = useContext(ThemeContext)

  return <Button sx={sxMinButton} variant="text" color={"salmon"} onClick={handleClick}><ContrastIcon /></Button>
}

export default ThemeButton