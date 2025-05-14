import setupDataChannel from "@/pages/Room/dataChannelConfig";
import BasePeer from "@/pages/Room/WebRTC/BasePeer";
import StoreSocket from "@/shared/api/Store-Socket";
import { toSOSe } from "@shared/MAPPERS";

class PeerCaller extends BasePeer {
  constructor() {
    super()
  }

  private sendOffer = (id: number, description: RTCSessionDescriptionInit) => {
    console.log(this.peerConnection, this.dataChanel)
    StoreSocket.socket?.send(toSOSe('offer', {id: id, description: description}))
  }

  createOffer = async () => {
    this.dataChanel = setupDataChannel(this.peerConnection.createDataChannel('test'))

    this.offer = await this.peerConnection.createOffer()
    await this.peerConnection.setLocalDescription(this.offer)
    this.sendOffer(this.toId, this.peerConnection.localDescription!)
    console.log(this.peerConnection.localDescription)
  }

  SocketGetAnswer = async (answer: RTCSessionDescriptionInit) => {
    console.log('ансвер получен')
    await this.peerConnection.setRemoteDescription(answer)
  }
}

export default new PeerCaller