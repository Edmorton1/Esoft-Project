import setupDataChannel from "@/pages/Room/WebRTC/config/dataChannelConfig";
import BasePeer from "@/pages/Room/WebRTC/BasePeer";
import MediaPermissions from "@/pages/Room/WebRTC/MediaPermissions";
import StoreRoom from "@/pages/Room/WebRTC/Store-Room";
import StoreSocket from "@/shared/api/Store-Socket";
import { toSOSe } from "@shared/MAPPERS";

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
    StoreSocket.socket?.send(toSOSe('offer', {frid: this.frid, toid: this.toid, description: description}))
  }

  createOffer = async () => {
    this.stream = await MediaPermissions.setMediaCaller(this.peerConnection)
    StoreRoom.disableVideo()
    StoreRoom.enableAudio()

    this.dataChanel = setupDataChannel(this.peerConnection.createDataChannel('test'))

    this.offer = await this.peerConnection.createOffer()
    await this.peerConnection.setLocalDescription(this.offer)
    this.sendOffer(this.peerConnection.localDescription!)
    console.log(this.peerConnection.localDescription)
  }

  SocketGetAnswer = async (answer: RTCSessionDescriptionInit) => {
    console.log('ансвер получен')
    await this.peerConnection.setRemoteDescription(answer)
  }
}

export default PeerCaller