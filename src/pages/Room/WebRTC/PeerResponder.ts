import BasePeer from "@/pages/Room/WebRTC/BasePeer";
import StoreCall from "@/pages/Room/ModalCall/Store-Call";
import StoreSocket from "@/shared/api/Store-Socket";
import { toSOSe } from "@shared/MAPPERS";
import MediaPermissions from "@/pages/Room/WebRTC/MediaPermissions";
import StoreRoom from "@/pages/Room/WebRTC/Store-Room";
import VideoControl from "@/pages/Room/WebRTC/controllers/VideoControl";
import StoreForm from "@/shared/stores/Store-Form";

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
    StoreSocket.socket?.send(toSOSe('answer', {toForm: StoreForm.form!, frid: this.frid, description: description}))
  }

  SocketGetOffer = async (offer: RTCSessionDescriptionInit) => {
    console.log("SOCKET GET OFFER", offer)

    // await new Promise(res => setTimeout(() => res, 3000))
    await this.enableStreams()

    await this.peerConnection.setRemoteDescription(offer)
    console.log('[REMOTE DESCRIPTION]: УСТАНОВЛЕНО!!!')
    // await this.enableStreams()

    // this.stream = await MediaPermissions.setMediaResponder(this.peerConnection)
    // StoreRoom.enableVideo()
    // StoreRoom.enableAudio()

    // VideoControl.createLocalVideo(this.stream)


    StoreCall.openModal()
  }
  
  createAnswer = async () => {
    console.log("createAnswer")
    const answer = await this.peerConnection.createAnswer()
    await this.peerConnection.setLocalDescription(answer)
    this.sendAnswer(answer)
    
    console.log(this.peerConnection.getSenders().forEach(sender => {
      console.log('[SENDER]', sender.track?.kind, sender.track)
    }))
    console.log('[answer SDP]', answer.sdp)
  }
}

export default PeerResponder