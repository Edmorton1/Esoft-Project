import StoreSocket from "@/shared/api/Store-Socket";
import { toJSON, toSOSe } from "@shared/MAPPERS";

class StoreRoom {
  peerConnection = new RTCPeerConnection;
  dataChanel = this.peerConnection.createDataChannel('test');
  toId = 1
  frId = 2

  constructor() {
    this.dataChanel.onopen = () => console.log('Channel opened!')
    this.dataChanel.onmessage = e => console.log('Message', e.data)
    // this.peerConnection.onicecandidate = e => console.log('icecandidate', JSON.stringify(this.peerConnection.localDescription))

    this.peerConnection.ondatachannel = e => {
      console.log("ПОМЕНЯЛСЯ datachannel")
      this.dataChanel = e.channel
      this.dataChanel.onopen = () => console.log('Channel opened!')
      this.dataChanel.onmessage = e => console.log('Message', e.data)
      // this.peerConnection.onicecandidate = e => console.log('icecandidate', JSON.stringify(this.peerConnection.localDescription))
    }
  }

  offer: RTCSessionDescriptionInit | null = null;
  answer: RTCSessionDescriptionInit | null = null;

  // fakeOffer = async () => {
  //   this.offer = await this.peerConnection.createOffer()
  //   await this.sendOffer(this.toId, this.peerConnection.localDescription!)
  // }
  
  createOffer = async () => {
    this.offer = await this.peerConnection.createOffer()
    await this.peerConnection.setLocalDescription(this.offer)
    this.sendOffer(this.toId, this.peerConnection.localDescription!)
    console.log(this.peerConnection.localDescription)
  }

  private sendOffer = (id: number, description: RTCSessionDescriptionInit) => {
    console.log(this.peerConnection, this.dataChanel)
    StoreSocket.socket?.send(toSOSe('offer', {id: id, description: description}))
  }

  SocketGetOffer = async (offer: RTCSessionDescriptionInit) => {
    console.log("SOCKET GET OFFER", offer)
    await this.peerConnection.setRemoteDescription(offer)
    await this.createAnswer()
  }

  createAnswer = async () => {
    this.answer = await this.peerConnection.createAnswer()
    await this.peerConnection.setLocalDescription(this.answer);
    this.sendAnswer(this.answer)
    console.log('answer', this.answer)
  }

  private sendAnswer = (description: RTCSessionDescriptionInit) => {
    console.log('Отправка ансвера')
    StoreSocket.socket?.send(toSOSe('answer', {id: this.frId, description: description}))
  }

  SocketGetAnswer = async (answer: RTCSessionDescriptionInit) => {
    console.log('ансвер получен')
    await this.peerConnection.setRemoteDescription(answer)
  }  
}

export default new StoreRoom