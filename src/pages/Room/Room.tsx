import StoreRoom from "@/pages/Room/Store-Room"

function Room() {
  const peerConnection = new RTCPeerConnection()
  const dataChanel = peerConnection.createDataChannel('test')

  StoreRoom.peerConnection = peerConnection
  StoreRoom.dataChanel = dataChanel

  dataChanel.onopen = () => console.log('Channel opened!')
  dataChanel.onmessage = e => console.log('Message', e.data)

  let offer = null;
  let answer = null;

  // peerConnection.setLocalDescription(offer)

  const createOffer = async () => {
    offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    StoreRoom.sendOffer(1, peerConnection.localDescription!)
    console.log(peerConnection.localDescription)
  }

  const getOffer = async (offer: RTCSessionDescription) => {
    await peerConnection.setRemoteDescription(offer)
    console.log("Получен оффер", offer, peerConnection.remoteDescription)
  }

  const getAnswer = (answer: RTCSessionDescriptionInit) => {
    peerConnection.setRemoteDescription(answer)
  }

  const createAnswer = async () => {
    answer = peerConnection.createAnswer()
    peerConnection.setLocalDescription(await peerConnection.createAnswer());
  }

  return <>
    <button onClick={createOffer}>Позвонить пользователю 1</button>
    <button>Подобрать</button>
    {/* <button onClick={() => console.log(peerConnection.remoteDescription)}>Посмотреть оффер</button> */}
  </>
}

export default Room

