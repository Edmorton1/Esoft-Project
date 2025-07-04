import { useRef } from "react";

function useDebounceCallback() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMove = (callback: () => void, delay: number = 2000) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback()
    }, delay)
  }

  return handleMove
}

export default useDebounceCallback