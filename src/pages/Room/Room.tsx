import PeerCaller from "@/pages/Room/WebRTC/PeerCaller"
import PeerResponder from "@/pages/Room/WebRTC/PeerResponder"
import StoreRoom from "@/pages/Room/WebRTC/Store-Room"
import { useState } from "react"

function Room() {
  const [text, setText] = useState('')

  StoreRoom.createPeers(2, 1)

  return <>
    <button onClick={StoreRoom.Caller?.makeCall}>Позвонить пользователю 1</button>
    <div>
      <input type="text" onChange={e => setText(e.target.value)}/>
      <button onClick={() => StoreRoom.callChannel!.send(text)}>Отправить сообщние</button>
    </div>
    <br />
    <br />
    <div>dev</div>
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

