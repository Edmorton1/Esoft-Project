import { dataChannelTypes } from "@/pages/Room/WebRTC/config/messageTypes";
import StoreRoom from "@/pages/Room/WebRTC/Store-Room";
import { frJSON } from "@shared/MAPPERS";

const setupDataChannel = (channel: RTCDataChannel, event?: RTCDataChannelEvent): RTCDataChannel => {
  if (event) {
    channel = event.channel
  }
  console.log('SETUP DATA')
// СЮДА В БУДУЩЕМ ДОБАВИТЬ ОБРАБОТКУ ЗВУКА И ВИДЕО
  channel!.onopen = () => {console.log('Channel opened!'); StoreRoom.isOpen = true}
  channel.onclose = () => console.log('CLOSE: КАНАЛ ЗАКРЫЛСЯ')
  channel.onmessage = msg => {
    const {type, data} = frJSON<dataChannelTypes>(msg.data)
    switch(type) {
      case 'hangUp':
        StoreRoom.hangUp()
    } 
  }

  return channel
}

export default setupDataChannel