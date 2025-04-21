import $api, { noAuthorizeErrorAxios } from "@/store/api"
import storeAuthorization from "@/store/Store-User"
import Toast from "@/ui/Toast"
import { useEffect, useRef, useState } from "react"

function AuthorizeChecking() {
  const [err, setErr] = useState(false)
  const nodeRef = useRef(null)

  useEffect(() => {
    noAuthorizeErrorAxios(setErr)
    storeAuthorization.initial()
  }, [])
  
  return (
    <Toast nodeRef={nodeRef} state={err} />
  )
}

export default AuthorizeChecking