import AudioControl from "@/pages/Room/WebRTC/AudioControl"
import BasePeer from "@/pages/Room/WebRTC/BasePeer"
import PeerCaller from "@/pages/Room/WebRTC/PeerCaller"
import PeerResponder from "@/pages/Room/WebRTC/PeerResponder"
import StoreRoom from "@/pages/Room/WebRTC/Store-Room"
import StoreCall from "@/shared/ui/ModalCall/StoreCall"
import VideoControl from "@/pages/Room/WebRTC/VideoControl"
import useLive from "@/shared/hooks/useLive"
import StoreUser from "@/shared/stores/Store-User"
import { useEffect, useRef, useState } from "react"
import StoreTalking from "@/shared/ui/ModalTalking/StoreTalking"

// ФУНКЦИЯ
function Room() {
  const [text, setText] = useState('')

  // useEffect(() => {
  //   StoreRoom.createPeers(2, 1, StoreUser.user?.id === 2)
  // }, [])

  const [audioRef, videoRef] = useLive(AudioControl, VideoControl)

  const handlerCallClick = () => {
    // if (StoreRoom.Peer instanceof PeerCaller) {
    //   StoreRoom.Peer.createOffer()
    // } else {
    //   console.warn(`Недопустимый метод для ${StoreRoom.Peer instanceof PeerCaller}`)
    // }
    StoreRoom.makeCall(StoreUser.user!.id, 1)
  }

  return <>
    <button onClick={handlerCallClick}>Позвонить пользователю 1</button>
    <div>
      <input type="text" onChange={e => setText(e.target.value)}/>
      <button onClick={() => StoreRoom?.Peer?.sendMessageCaller(text)}>Отправить сообщние</button>
      {/* <button onClick={() => StoreRoom.closeConnection()}>Бросить трубку</button> */}
    </div>
    <br />
    <br />
    <div>dev</div>
    <button onClick={() => {if (StoreRoom.Peer instanceof PeerResponder) StoreRoom.Peer.createAnswer()}}>Взять трубку</button>
    <button onClick={() => StoreCall.openModal('Ramzan')}>Modal</button>
    <button onClick={() => StoreTalking.openModal()}>Modal Talking</button>
    {/* <button onClick={() => StoreRoom.setOpenTrue()}>DataChannel opened?</button> */}
  </>
}

export default Room

