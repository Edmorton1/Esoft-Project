import StoreRoom from "@/pages/Room/WebRTC/Store-Room"
import Button from "@mui/material/Button"
import { observer } from "mobx-react-lite"

function ButtonVideo() {
  const handleClick = () => StoreRoom.videoEnabled ? StoreRoom.disableVideo(true) : StoreRoom.enableVideo(true)

  return <Button onClick={handleClick} variant="contained">
    {StoreRoom.videoEnabled ? 'Отключить видео' : 'Включить видео'}
  </Button>
}

export default observer(ButtonVideo)