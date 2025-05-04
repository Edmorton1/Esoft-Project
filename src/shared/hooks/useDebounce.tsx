import { useEffect, useState } from "react"

const useDebounce = (text: string) => {
  const [debounce, setDebounce] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(text)
    }, 300)

    return () => clearTimeout(timeout)
  }, [text])

  return debounce
}

export default useDebounce