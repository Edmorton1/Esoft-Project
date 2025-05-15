import BasePeer from "@/pages/Room/WebRTC/BasePeer";
import StoreSocket from "@/shared/api/Store-Socket";
import { toSOSe } from "@shared/MAPPERS";

class PeerResponder extends BasePeer {
  constructor(
    readonly frid: number,
    readonly toid: number
  ) {
    super(frid, toid)

    this.peerConnection.onicecandidate = e => {
      if (e.candidate) {
        StoreSocket.socket?.send(toSOSe('candidate', {isCaller: false, id: this.frid, candidate: e.candidate}))
      }
    }
  }

  private sendAnswer = (description: RTCSessionDescriptionInit) => {
    console.log('Отправка ансвера')
    StoreSocket.socket?.send(toSOSe('answer', {id: this.frid, description: description}))
  }

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
}

export default PeerResponder