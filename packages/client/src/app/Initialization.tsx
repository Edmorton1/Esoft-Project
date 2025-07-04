// import { noAuthorizeErrorAxios } from "@/shared/api/api"
import StoreUser from "@/shared/stores/Store-User"
import { useEffect } from "react"
import Alert from "@/shared/ui/Toast/Alert"
import ModalCall from "@/pages/Room/widgets/ModalCall/ModalCall"
import CallLine from "@/pages/Room/widgets/CallLine/CallLine"
import ModalTalking from "@/pages/Room/widgets/ModalTalking/ModalTalkingHead"
import StoreCall from "@/pages/Room/widgets/ModalCall/store/Store-Call"
import StoreTalking from "@/pages/Room/widgets/ModalTalking/store/Store-Talking"
import { observer } from "mobx-react-lite"
import ModalFile from "@/shared/ui/modals/Files/ModalFile"
import LoginModal from "@/shared/ui/modals/Login/LoginModal"
import PasswordModal from "@/pages/Settings/widgets/Account/Modals/PasswordModal"
import ThrowError from "@/errors/ThrowError"
import ModalExit from "@/shared/ui/modals/Exit/ModalExit"

function Initialization() {

  useEffect(() => {
    // noAuthorizeErrorAxios()

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
    <LoginModal />
    <PasswordModal />
    <CallLine />
    <ThrowError />
    <ModalExit />
  </>
}

export default observer(Initialization)