import setupDataChannel from "@/pages/Room/WebRTC/config/dataChannelConfig";
import BasePeer from "@/pages/Room/WebRTC/logic/BasePeer";
import StoreSocket from "@/shared/api/Store-Socket";
import { toSOSe } from "@s/helpers/WebSocket/JSONParsers";
import StoreForm from "@/shared/stores/Store-Form";

class PeerCaller extends BasePeer {
  constructor(
    readonly frid: number,
    readonly toid: number
  ) {
    super(frid, toid)

    this.peerConnection.onicecandidate = e => {
      if (e.candidate) {
        StoreSocket.socket?.send(toSOSe('candidate', {isCaller: true, id: this.toid, candidate: e.candidate}))
      }
    }
  }

  // stream: MediaStream | null = null

  private sendOffer = (description: RTCSessionDescriptionInit) => {
    console.log(this.peerConnection, this.dataChanel)
    StoreSocket.socket?.send(toSOSe('offer', {frForm: StoreForm.form!, toid: this.toid, description: description}))
  }

  createOffer = async () => {
    await this.enableStreams()

    this.dataChanel = setupDataChannel(this.peerConnection.createDataChannel('test'))

    const offer = await this.peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    })
    await this.peerConnection.setLocalDescription(offer)
    this.sendOffer(this.peerConnection.localDescription!)
    console.log(this.peerConnection.localDescription)
  }

  SocketGetAnswer = async (answer: RTCSessionDescriptionInit) => {
    console.log('ансвер получен')
    await this.peerConnection.setRemoteDescription(answer)
  }
}

export default PeerCaller