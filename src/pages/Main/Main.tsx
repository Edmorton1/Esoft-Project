import ModalCall from "@/pages/Room/ModalCall/ModalCall"
import { useState } from "react"
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";

function Main() {
  const [error, setError] = useState(false)

  if (error) throw new Error('Fallback error')

  return (
    <>
      <button onClick={() => setError(true)}>asdasd</button>
      <ModalCall></ModalCall>

            <FormControl>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">Well never share your email.</FormHelperText>
            </FormControl>
    </>

  )
}

export default Main