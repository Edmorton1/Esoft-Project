import AudioControl from "@/pages/Room/WebRTC/AudioControl"
import BasePeer from "@/pages/Room/WebRTC/BasePeer"
import PeerCaller from "@/pages/Room/WebRTC/PeerCaller"
import PeerResponder from "@/pages/Room/WebRTC/PeerResponder"
import StoreRoom from "@/pages/Room/WebRTC/Store-Room"
import useVoice from "@/shared/hooks/useVoice"
import StoreUser from "@/shared/stores/Store-User"
import { useEffect, useRef, useState } from "react"

// ФУНКЦИЯ
function Room() {
  const [text, setText] = useState('')

  useEffect(() => {
    StoreRoom.createPeers(2, 1, StoreUser.user?.id === 2)
  }, [])

  const audioRef = useVoice(AudioControl)

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
    <button onClick={() => audioRef.current!.start()}>Начать запись голоса</button>
    <button onClick={() => audioRef.current!.stop()}>Завершить</button>
    <button onClick={() => console.log(audioRef.current)}>Чанки</button>
    {/* <button onClick={() => StoreRoom.Peer?.sendMessageCaller('asdasd')}>Show Classes</button> */}
    {/* <button onClick={() => console.log(PeerCaller)}>Child</button>
    <button onClick={() => console.log(PeerCaller.peerConnection.localDescription)}>ЛОКАЛ КАЛЛЕР</button>
    <button onClick={() => console.log(PeerCaller.peerConnection.remoteDescription)}>РЕМОТ КАЛЛЕР</button>
    <button onClick={() => console.log(PeerResponder.peerConnection.localDescription)}>ЛОКАЛ РЕМОТ</button>
    <button onClick={() => console.log(PeerResponder.peerConnection.remoteDescription)}>РЕМОТ РЕМОТ</button>

    <button onClick={() => console.log(PeerCaller.iceCandidates)}>КАНДИДАТЫ КАЛЛЕР</button>
    <button onClick={() => console.log(PeerResponder.iceCandidates)}>КАНДИДАТЫ RESPONSE</button>
    <button onClick={() => console.log(PeerCaller.peerConnection.iceConnectionState)}>can cal</button> */}

    {/* <button onClick={() => console.log(StoreRoom.peerConnection)}>ПИР КОН</button>
    <button onClick={() => console.log(StoreRoom.dataChanel)}>DATA CHAN</button> */}
    {/* <button onClick={() => console.log(peerConnection.remoteDescription)}>Посмотреть оффер</button> */}
  </>
}

export default Room

