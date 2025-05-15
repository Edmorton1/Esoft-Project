import setupDataChannel from "@/pages/Room/dataChannelConfig";
import StoreSocket from "@/shared/api/Store-Socket";
import StoreUser from "@/shared/stores/Store-User";
import { toSOSe } from "@shared/MAPPERS";

class MonoRoom {
  peerConnection = new RTCPeerConnection;
  dataChanel: null | RTCDataChannel = null;

  toId = 1
  frId = 2

  offer: RTCSessionDescriptionInit | null = null;
  answer: RTCSessionDescriptionInit | null = null;

  constructor() {
    this.peerConnection.onicecandidate = e => console.log('icecandidate', JSON.stringify(this.peerConnection.localDescription))

    this.peerConnection.ondatachannel = e => {
      if (!this.dataChanel) {
        console.log("ПОМЕНЯЛСЯ datachannel")
        this.dataChanel = setupDataChannel(e.channel)
      }
    }
    this.peerConnection.onicecandidate = e => {
      if (e.candidate) {
        //@ts-ignore
        StoreSocket.socket?.send(toSOSe('candidate', {id: StoreUser.user?.id === 2 ? 1 : 2, candidate: e.candidate}))
      }
    }
  }
  
  SocketGetCandidate = async (candidate: RTCIceCandidate) => {
    await this.peerConnection.addIceCandidate(candidate)
  }
  
  // КЛИЕНТ А
  createOffer = async () => {
    this.dataChanel = setupDataChannel(this.peerConnection.createDataChannel('test'))

    this.offer = await this.peerConnection.createOffer()
    await this.peerConnection.setLocalDescription(this.offer)
    this.sendOffer(this.toId, this.peerConnection.localDescription!)
    console.log(this.peerConnection.localDescription)
  }

  private sendOffer = (id: number, description: RTCSessionDescriptionInit) => {
    console.log(this.peerConnection, this.dataChanel)
    StoreSocket.socket?.send(toSOSe('offer', {id: id, description: description}))
  }

  // КЛИЕНТ Б
  SocketGetOffer = async (offer: RTCSessionDescriptionInit) => {
    console.log("SOCKET GET OFFER", offer)
      await this.peerConnection.setRemoteDescription(offer)
      await this.createAnswer()
  }

  createAnswer = async () => {
    console.log("createAnswer")
    this.answer = await this.peerConnection.createAnswer()
    await this.peerConnection.setLocalDescription(this.answer)
    this.sendAnswer(this.answer)
    console.log('answer', this.answer)
  }

  private sendAnswer = (description: RTCSessionDescriptionInit) => {
    console.log('Отправка ансвера')
    StoreSocket.socket?.send(toSOSe('answer', {id: this.frId, description: description}))
  }

  // КЛИЕНТ А
  SocketGetAnswer = async (answer: RTCSessionDescriptionInit) => {
    console.log('ансвер получен')
    await this.peerConnection.setRemoteDescription(answer)
  }
}

export default new MonoRoom