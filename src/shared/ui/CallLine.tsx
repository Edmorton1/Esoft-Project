import StoreRoom from "@/pages/Room/WebRTC/Store-Room"
import { observer } from "mobx-react-lite"

function CallLine() {
  if (StoreRoom.isOpen) {
    return (
      <div style={{backgroundColor: "red", width: "500px", height:"500px"}}></div>
    )
  }
  
  return (
    <div>wait</div>
  )
}

export default observer(CallLine)