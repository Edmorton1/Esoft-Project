import setupDataChannel from "@/pages/Room/dataChannelConfig";
import StoreSocket from "@/shared/api/Store-Socket";
import StoreUser from "@/shared/stores/Store-User";
import { toSOSe } from "@shared/MAPPERS";

abstract class BasePeer {
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
        StoreSocket.socket?.send(toSOSe('candidate', {id: StoreUser.user?.id === 2 ? 1 : 2, candidate: e.candidate}))
      }
    }
  }
}

export default BasePeer