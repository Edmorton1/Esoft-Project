import $api, { noAuthorizeErrorAxios } from "@/store/api"
import storeAuthorization from "@/store/Store-User"
import Toast from "@/ui/Toast"
import { cloneElement, useEffect, useRef, useState } from "react"

interface propsInterface {
  state: boolean,
  setState: React.Dispatch<React.SetStateAction<boolean>>
  children: any
}
// Тост инициализируется, поэтому время всегда разное
function Alert({state, setState, children}: propsInterface) {
  const nodeRef = useRef(null)

  useEffect(() => {
    setInterval(() => setState(false), 3000)
    clearInterval(3000)
  }, [])
  
  return (
    <Toast nodeRef={nodeRef} state={state}>{children}</Toast>
  )
}

export default Alert