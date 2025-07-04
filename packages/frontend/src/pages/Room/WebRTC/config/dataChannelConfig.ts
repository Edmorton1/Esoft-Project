import StoreTalking from "@app/client/pages/Room/widgets/ModalTalking/store/Store-Talking";
import { dataChannelTypes } from "@app/client/pages/Room/WebRTC/config/messageTypes";
import StoreRoom from "@app/client/pages/Room/WebRTC/Store-Room";
import { frJSON } from "@app/shared/MAPPERS";

const setupDataChannel = (channel: RTCDataChannel, event?: RTCDataChannelEvent): RTCDataChannel => {
  if (event) {
    channel = event.channel
  }
  console.log('SETUP DATA')
// СЮДА В БУДУЩЕМ ДОБАВИТЬ ОБРАБОТКУ ЗВУКА И ВИДЕО
  channel!.onopen = () => {console.log('Channel opened!'); StoreRoom.isOpen = true; StoreTalking.openModal(); StoreTalking.startTimer()}
  channel.onmessage = msg => {
    const parsed = frJSON<dataChannelTypes>(msg.data)
    switch(parsed.type) {
      case 'enablingVideo':
        if (parsed.data) {
          StoreRoom.enableVideo(false)
        } else {
          StoreRoom.disableVideo(false)
        }
    } 
  }
  channel.onclose = () => {
    console.log('CLOSE: КАНАЛ ЗАКРЫЛСЯ')
    StoreRoom.cleaning()
  }

  return channel
}

export default setupDataChannel