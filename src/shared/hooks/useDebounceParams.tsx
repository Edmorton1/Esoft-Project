import useUpdateParams from "@/shared/hooks/useChangeParams"
import useDebounce from "@/shared/hooks/useDebounce"
import { ChangeEvent, useEffect } from "react"

function useDebounceParams(keyName: string): [string | null, (e: any) => any] {
  const UpdateParams = useUpdateParams()

  const [debounce, setDebounce] = useDebounce()
  const initial = UpdateParams.params[keyName]

  useEffect(() => {
    if (initial && debounce === null) {
      setDebounce(initial)
    } else {
      UpdateParams.update(keyName, debounce!, false)
    }
  }, [debounce])

  const handleChange = (text: string) => setDebounce(text)

  return [debounce, handleChange]
}

export default useDebounceParams