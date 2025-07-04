import useUpdateParams from "@app/client/shared/hooks/useChangeParams"
import useDebounce from "@app/client/shared/hooks/useDebounce"
import { useEffect } from "react"

function useDebounceParams(keyName: string, reload: boolean = false): [string | null, (e: any) => any] {
  const [params, updateParams] = useUpdateParams()
  const [debounce, setDebounce] = useDebounce()
  
  const initial = params[keyName]

  useEffect(() => {
    console.log(initial, debounce)
    if (initial && debounce === null) {
      setDebounce(initial)
    } else if (!initial && debounce === null) {
      return
    } else {
      updateParams(keyName, debounce!, reload)
    }
  }, [debounce])

  const handleChange = (text: string) => setDebounce(text)

  return [debounce, handleChange]
}

export default useDebounceParams