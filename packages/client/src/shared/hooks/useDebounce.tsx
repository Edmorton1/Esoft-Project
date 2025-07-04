import { useCallback, useRef, useState } from "react"

const useDebounce = (delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  // console.log(timeoutRef.current)

  const debounce = useCallback((value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
  }, [delay]);

  return [debouncedValue, debounce] as const;
};

export default useDebounce