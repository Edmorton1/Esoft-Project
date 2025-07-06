import StoreRoom from "@app/client/pages/Room/WebRTC/Store-Room"
import { observer } from "mobx-react-lite"
import * as style from "@app/client/shared/css/components/CallLine.module.scss"
import Clock from "@app/client/pages/Room/widgets/ModalTalking/components/Clock"
import StoreCall from "@app/client/pages/Room/widgets/ModalCall/store/Store-Call"
import StoreTalking from "@app/client/pages/Room/widgets/ModalTalking/store/Store-Talking"

function CallLine() {
  console.log(style)
  const handleClick = () => StoreTalking.openModal()

  if (StoreRoom.isOpen) {
    return <div className={style.main} onClick={handleClick}>
      <span>{`${StoreCall.anotherForm?.name}\u00A0`}</span>
      <Clock/>
    </div>
  }
  return;
}

export default observer(CallLine)