import BasePeer from "@/pages/Room/WebRTC/BasePeer";
import StoreCall from "@/shared/ui/ModalCall/StoreCall";
import StoreSocket from "@/shared/api/Store-Socket";
import { toSOSe } from "@shared/MAPPERS";
import MediaPermissions from "@/pages/Room/WebRTC/MediaPermissions";
import StoreRoom from "@/pages/Room/WebRTC/Store-Room";

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

    this.stream = await MediaPermissions.setMediaResponder(this.peerConnection)
    StoreRoom.disableVideo()
    StoreRoom.enableAudio()

    StoreCall.openModal('assadsda')
    // await this.createAnswer()
  }
  
  createAnswer = async () => {
    console.log("createAnswer")
    const answer = await this.peerConnection.createAnswer()
    await this.peerConnection.setLocalDescription(answer)
    this.sendAnswer(answer)
    console.log('answer', answer)
  }
}

export default PeerResponder