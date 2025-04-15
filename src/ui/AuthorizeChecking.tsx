import $api, { noAuthorizeErrorAxios } from "@/store/api"
import storeAuthorization from "@/store/store-authorization"
import ErrorAuthorize from "@/ui/ErrorAuthorize"
import { useEffect, useRef, useState } from "react"

function AuthorizeChecking() {
  const [err, setErr] = useState(false)
  const nodeRef = useRef(null)

  useEffect(() => {
    noAuthorizeErrorAxios(setErr)
    storeAuthorization.initializing()
  }, [])
  
  return (
    <ErrorAuthorize nodeRef={nodeRef} state={err} />
  )
}

export default AuthorizeChecking