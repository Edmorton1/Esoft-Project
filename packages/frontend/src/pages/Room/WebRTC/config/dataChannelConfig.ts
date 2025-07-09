import StoreTalking from "@app/client/pages/Room/modules/ModalTalking/store/Store-Talking";
import { dataChannelTypes } from "@app/client/pages/Room/WebRTC/config/messageTypes";
import StoreRoom from "@app/client/pages/Room/WebRTC/Store-Room";

const setupDataChannel = (channel: RTCDataChannel, event?: RTCDataChannelEvent): RTCDataChannel => {
  if (event) {
    channel = event.channel
  }
  console.log('SETUP DATA')
// СЮДА В БУДУЩЕМ ДОБАВИТЬ ОБРАБОТКУ ЗВУКА И ВИДЕО
  channel!.onopen = () => {console.log('Channel opened!'); StoreRoom.isOpen = true; StoreTalking.openModal(); StoreTalking.startTimer()}
  channel.onmessage = msg => {
    const parsed = JSON.parse(msg.data) as dataChannelTypes
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