import { ThemeContext } from "@/app/ChangeTheme"
import { useContext } from "react"

function ThemeButton() {
  const handleClick = useContext(ThemeContext)

  return <button onClick={handleClick}>Сменить тему</button>
}

export default ThemeButton