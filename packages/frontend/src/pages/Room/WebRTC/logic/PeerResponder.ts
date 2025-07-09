import BasePeer from "@app/client/pages/Room/WebRTC/logic/BasePeer";
import StoreCall from "@app/client/pages/Room/modules/ModalCall/store/Store-Call";
import StoreSocket from "@app/client/shared/api/Store-Socket";
import { toSOSe } from "@app/shared/JSONParsers";
import StoreForm from "@app/client/shared/stores/Store-Form";
import StoreTalking from "@app/client/pages/Room/modules/ModalTalking/store/Store-Talking";

class PeerResponder extends BasePeer {
  constructor(
    override readonly frid: number,
    override readonly toid: number
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


    StoreCall.openMount()
    StoreCall.openModal()
  }
  
  createAnswer = async () => {
    StoreCall.closeModal();
    // StoreTalking.openMount()
    StoreTalking.openModal()

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