import AudioControl from "@/pages/Room/WebRTC/controllers/AudioControl"
import PeerResponder from "@/pages/Room/WebRTC/PeerResponder"
import StoreRoom from "@/pages/Room/WebRTC/Store-Room"
import StoreCall from "@/pages/Room/ModalCall/Store-Call"
import VideoControl from "@/pages/Room/WebRTC/controllers/VideoControl"
// import useLive from "@/shared/hooks/useLive"
import StoreUser from "@/shared/stores/Store-User"
import { useEffect, useState } from "react"
import StoreTalking from "@/pages/Room/ModalTalking/Store-Talking"
import { observer } from "mobx-react-lite"

// ФУНКЦИЯ
function Room() {
  const [text, setText] = useState('')
  const hooCall = 2

  // const [audioRef, videoRef] = useLive(AudioControl, VideoControl)

  const handlerCallClick = () => {
    // if (StoreRoom.Peer instanceof PeerCaller) {
    //   StoreRoom.Peer.createOffer()
    // } else {
    //   console.warn(`Недопустимый метод для ${StoreRoom.Peer instanceof PeerCaller}`)
    // }

    // StoreRoom.makeCall(StoreUser.user!.id, 1)
    StoreRoom.makeCall(StoreUser.user!.id, hooCall)
  }

  return <>
    <button onClick={handlerCallClick}>Позвонить пользователю {hooCall}</button>
    <button onClick={() => StoreRoom.makeCall(2, 1)}>Позвонить пользователю 1</button>
    <div>
      <input type="text" onChange={e => setText(e.target.value)}/>
      <button onClick={() => StoreRoom?.Peer?.sendMessageCaller()}>Отправить сообщние</button>
      {/* <button onClick={() => StoreRoom.closeConnection()}>Бросить трубку</button> */}
    </div>
    {/* <button onClick={() => StoreRoom.videoEnabled ? StoreRoom.disableVideo() : StoreRoom.enableVideo()}>{StoreRoom.videoEnabled ? 'Отключить видео' : 'Включить видео'}</button>
    <button onClick={() => StoreRoom.audioEnebaled ? StoreRoom.disableAudio() : StoreRoom.enableAudio()}>{StoreRoom.audioEnebaled ? 'Отключить аудио' : 'Включить аудио'}</button> */}
    <br />
    <br />
    <div>dev</div>
    <button>Посмотреть потоки</button>
    <button onClick={() => {if (StoreRoom.Peer instanceof PeerResponder) StoreRoom.Peer.createAnswer()}}>Взять трубку</button>
    <button onClick={() => StoreCall.openModal('Ramzan')}>Modal</button>
    <button onClick={() => StoreTalking.openModal()}>Modal Talking</button>
    {/* <button onClick={() => StoreRoom.setOpenTrue()}>DataChannel opened?</button> */}
  </>
}

export default Room

