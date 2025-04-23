import $api, { noAuthorizeErrorAxios } from "@/store/api"
import StoreUser from "@/store/Store-User"
import Toast from "@/ui/Toast"
import { useEffect, useRef, useState } from "react"
import * as style from "@/css/ToastError.scss"
import StoreLikes from "@/store/StoreLikes"
import Alert from "@/ui/Alert"

function Initialization() {

  useEffect(() => {
    noAuthorizeErrorAxios()

    const fetchData = async () => {
      await StoreUser.initial()
    }

    fetchData()
  }, [])
  
  return (
    <Alert />
  )
}

export default Initialization