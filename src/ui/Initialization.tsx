import $api, { noAuthorizeErrorAxios } from "@/store/api"
import storeAuthorization from "@/store/Store-User"
import Toast from "@/ui/Toast"
import { useEffect, useRef, useState } from "react"
import * as style from "@/css/ToastError.scss"
import StoreLikes from "@/store/StoreLikes"

function Initialization() {
  const [err, setErr] = useState(false)
  const nodeRef = useRef(null)

  useEffect(() => {
    noAuthorizeErrorAxios(setErr)

    const fetchData = async () => {
      await storeAuthorization.initial()
      await StoreLikes.initial()
    }

    fetchData()
  }, [])
  
  return (
    <Toast nodeRef={nodeRef} state={err}>
      <div ref={nodeRef} className={style.toast}>НЕАВТОРИЗОВАН</div>
    </Toast>
  )
}

export default Initialization