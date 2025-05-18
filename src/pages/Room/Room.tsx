import AudioControl from "@/pages/Room/WebRTC/AudioControl"
import BasePeer from "@/pages/Room/WebRTC/BasePeer"
import PeerCaller from "@/pages/Room/WebRTC/PeerCaller"
import PeerResponder from "@/pages/Room/WebRTC/PeerResponder"
import StoreRoom from "@/pages/Room/WebRTC/Store-Room"
import VideoControl from "@/pages/Room/WebRTC/VideoControl"
import useMedia from "@/shared/hooks/useMedia"
import StoreUser from "@/shared/stores/Store-User"
import { useEffect, useRef, useState } from "react"

// ФУНКЦИЯ
function Room() {
  const [text, setText] = useState('')

  useEffect(() => {
    StoreRoom.createPeers(2, 1, StoreUser.user?.id === 2)
  }, [])

  const [audioRef, videoRef] = useMedia(AudioControl, VideoControl)

  const handlerCallClick = () => {
    if (StoreRoom.Peer instanceof PeerCaller) {
      StoreRoom.Peer.makeCall()
    } else {
      console.warn(`Недопустимый метод для ${StoreRoom.Peer instanceof PeerCaller}`)
    }
  }

  return <>
    <button onClick={handlerCallClick}>Позвонить пользователю 1</button>
    <div>
      <input type="text" onChange={e => setText(e.target.value)}/>
      <button onClick={() => StoreRoom?.Peer?.sendMessageCaller(text)}>Отправить сообщние</button>
      <button onClick={() => StoreRoom.closeConnection()}>Бросить трубку</button>
    </div>
    <br />
    <br />
    <div>dev</div>
  </>
}

export default Room

