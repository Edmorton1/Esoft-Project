import StoreRoom from "@/pages/Room/WebRTC/Store-Room";

const setupDataChannel = (channel: RTCDataChannel, event?: RTCDataChannelEvent): RTCDataChannel => {
  if (event) {
    channel = event.channel
  }
  console.log('SETUP DATA')
// СЮДА В БУДУЩЕМ ДОБАВИТЬ ОБРАБОТКУ ЗВУКА И ВИДЕО
  channel!.onopen = () => {console.log('Channel opened!'); StoreRoom.isOpen = true}
  channel.onmessage = e => console.log('Message', e.data)
  channel.onclose = () => console.log('CLOSE: КАНАЛ ЗАКРЫЛСЯ')

  return channel
}

export default setupDataChannel