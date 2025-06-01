import StoreRoom from "@/pages/Room/WebRTC/Store-Room"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import { observer } from "mobx-react-lite"
import * as styles from "@/shared/css/CallLine.module.scss"
import Clock from "@/pages/Room/widgets/ModalTalking/components/Clock"
import StoreCall from "@/pages/Room/widgets/ModalCall/store/Store-Call"
import StoreTalking from "@/pages/Room/widgets/ModalTalking/store/Store-Talking"

function CallLine() {
  console.log(styles)
  const handleClick = () => StoreTalking.openModal()

  if (StoreRoom.isOpen) {
    return <div className={styles.main} onClick={handleClick}>
      <span>{`${StoreCall.anotherForm?.name}\u00A0`}</span>
      <Clock/>
    </div>
  }
}

export default observer(CallLine)