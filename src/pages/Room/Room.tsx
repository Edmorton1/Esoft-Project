import PeerCaller from "@/pages/Room/WebRTC/PeerCaller"
import StoreRoom from "@/pages/Room/WebRTC/Store-Room"
import { useState } from "react"

function Room() {
  const [text, setText] = useState('')

  return <>
    <button onClick={StoreRoom.createOffer}>Позвонить пользователю 1</button>
    {/* <button onClick={StoreRoom.fakeOffer}>Fake</button> */}
    {/* <button onClick={StoreRoom.createAnswer}>Подобрать</button> */}
    <div>
      <input type="text" onChange={e => setText(e.target.value)}/>
      <button onClick={() => PeerCaller.dataChanel!.send(text)}>Отправить сообщние</button>
    </div>
    <br />
    <br />
    <div>dev</div>
    <button onClick={() => console.log(PeerCaller)}>Child</button>
    {/* <button onClick={() => console.log(StoreRoom.peerConnection.localDescription)}>ЛОКАЛ</button>
    <button onClick={() => console.log(StoreRoom.peerConnection.remoteDescription)}>РЕМОТ</button>
    <button onClick={() => console.log(StoreRoom.peerConnection)}>ПИР КОН</button>
    <button onClick={() => console.log(StoreRoom.dataChanel)}>DATA CHAN</button> */}
    {/* <button onClick={() => console.log(peerConnection.remoteDescription)}>Посмотреть оффер</button> */}
  </>
}

export default Room

