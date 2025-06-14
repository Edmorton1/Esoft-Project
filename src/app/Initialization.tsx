import { noAuthorizeErrorAxios } from "@/shared/api/api"
import StoreUser from "@/shared/stores/Store-User"
import { useEffect } from "react"
import Alert from "@/shared/ui/Alert"
import ModalCall from "@/pages/Room/widgets/ModalCall/ModalCall"
import CallLine from "@/pages/Room/widgets/CallLine/CallLine"
import ModalTalking from "@/pages/Room/widgets/ModalTalking/ModalTalkingHead"
import StoreCall from "@/pages/Room/widgets/ModalCall/store/Store-Call"
import StoreTalking from "@/pages/Room/widgets/ModalTalking/store/Store-Talking"
import { observer } from "mobx-react-lite"
import ModalFile from "@/shared/components/modal/ModalFile"

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
    {StoreCall.mount && <ModalCall />}
    {StoreTalking.mount && <ModalTalking />}
    <ModalFile />
    <CallLine />
  </>
}

export default observer(Initialization)