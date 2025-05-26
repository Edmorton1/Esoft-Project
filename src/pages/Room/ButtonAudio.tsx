import StoreRoom from "@/pages/Room/WebRTC/Store-Room"
import Button from "@mui/material/Button"
import { observer } from "mobx-react-lite"

function ButtonAudio() {
  const handleClick = () => StoreRoom.audioEnebaled ? StoreRoom.disableAudio() : StoreRoom.enableAudio()

  return <Button onClick={handleClick} variant="contained">
    {StoreRoom.audioEnebaled ? 'Отключить аудио' : 'Включить аудио'}
  </Button>
}

export default observer(ButtonAudio)