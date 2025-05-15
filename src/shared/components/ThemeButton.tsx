import { useEffect, useState } from "react"
import "@/app/App.scss"

function ThemeButton() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    const body = document.body

    if (isDark) {
      body.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      body.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  return (
    <button onClick={toggleTheme}>
      {isDark ? 'Dark' : 'Light'}
    </button>
  )
}

export default ThemeButton
