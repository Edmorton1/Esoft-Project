import useDebounceParams from "@/shared/hooks/useDebounceParams"
import { ChangeEvent } from "react"

function Input({keyName}: {keyName: string}) {
  const [debParams, setDebParams] = useDebounceParams(keyName)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setDebParams(e.target.value)

  return <>
    <input type="text" onChange={handleChange} defaultValue={debParams!} />
    {/* <p>{debounce}</p>
    <button onClick={() => console.log(debounce)} >loa</button> */}
  </>
}

export default Input