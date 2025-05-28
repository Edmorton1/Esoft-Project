import { noAuthorizeErrorAxios } from "@/shared/api/api"
import StoreUser from "@/shared/stores/Store-User"
import { useEffect } from "react"
import Alert from "@/shared/ui/Alert"
import ModalCall from "@/pages/Room/ModalCall/ModalCall"
import CallLine from "@/shared/ui/CallLine"
import ModalTalking from "@/pages/Room/ModalTalking/ModalTalking"

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