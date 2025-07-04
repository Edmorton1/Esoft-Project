import useDebounceParams from "@/shared/hooks/useDebounceParams"
import TextField from "@mui/material/TextField"
import { ChangeEvent } from "react"

type inputType = 'text' | 'number'

function Input({keyName, type, label}: {keyName: string, type: inputType, label: string}) {
  console.log("input")
  const [debParams, setDebParams] = useDebounceParams(keyName)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setDebParams(e.target.value)

  return <TextField fullWidth label={label} type={type} onChange={handleChange} defaultValue={debParams!} />
}

export default Input