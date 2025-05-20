import $api, { noAuthorizeErrorAxios } from "@/shared/api/api"
import StoreUser from "@/shared/stores/Store-User"
import Toast from "@/shared/ui/Toast"
import { useEffect } from "react"
import Alert from "@/shared/ui/Alert"
import ModalCall from "@/shared/ui/ModalCall/ModalCall"
import CallLine from "@/shared/ui/CallLine"
import ModalTalking from "@/shared/ui/ModalTalking/ModalTalking"

function Initialization() {

  useEffect(() => {
    noAuthorizeErrorAxios()

    const fetchData = async () => {
      await StoreUser.initial()
    }

    fetchData()
  }, [])
  
  return <>
    <Alert />
    <ModalCall />
    <ModalTalking />
    <CallLine />
  </>
}

export default Initialization