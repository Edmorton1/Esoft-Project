import { useEffect, useState } from "react"
import * as styles from "@/css/App.scss"

function Theme() {
  const [state, setState] = useState(false)
  // light - false
  // dark - true

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    setState(theme === "dark")

    const body = document.getElementsByTagName('body')[0]
    body.classList.remove("dark")
    if (theme === 'dark') {
      body.classList.add(styles.dark)
    } else {
      body.classList.remove(styles.dark)
    }
  }, [state])

  function handleClick() {
    setState(!state)
    
    localStorage.setItem('theme', !state === true ? 'dark' : 'light')
    console.log(!state)
  }

  return (
    <button onClick={handleClick}>{state ? 'Dark' : 'Light'}</button>
  )
}

export default Theme