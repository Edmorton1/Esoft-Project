import ModalCall from "@/shared/ui/ModalCall/ModalCall"
import { useState } from "react"

function Main() {
  const [error, setError] = useState(false)

  if (error) throw new Error('Fallback error')

  return (
    <>
      <button onClick={() => setError(true)}>asdasd</button>
      <ModalCall></ModalCall>
    </>

  )
}

export default Main