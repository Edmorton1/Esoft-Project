// import { noAuthorizeErrorAxios } from "@app/client/shared/api/api"
import StoreUser from "@app/client/shared/stores/Store-User"
import { useEffect } from "react"
import Alert from "@app/client/shared/ui/Toast/Alert"
import ModalCall from "@app/client/pages/Room/widgets/ModalCall/ModalCall"
import CallLine from "@app/client/pages/Room/widgets/CallLine/CallLine"
import ModalTalking from "@app/client/pages/Room/widgets/ModalTalking/ModalTalkingHead"
import StoreCall from "@app/client/pages/Room/widgets/ModalCall/store/Store-Call"
import StoreTalking from "@app/client/pages/Room/widgets/ModalTalking/store/Store-Talking"
import { observer } from "mobx-react-lite"
import ModalFile from "@app/client/shared/ui/modals/Files/ModalFile"
import LoginModal from "@app/client/shared/ui/modals/Login/LoginModal"
import PasswordModal from "@app/client/pages/Settings/widgets/Account/Modals/PasswordModal"
import ThrowError from "@app/client/errors/ThrowError"
import ModalExit from "@app/client/shared/ui/modals/Exit/ModalExit"

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