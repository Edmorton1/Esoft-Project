import BasePeer from "@/pages/Room/WebRTC/BasePeer"
import PeerCaller from "@/pages/Room/WebRTC/PeerCaller"
import PeerResponder from "@/pages/Room/WebRTC/PeerResponder"
import { makeAutoObservable } from "mobx"

class StoreRoom {
  // Caller: null | PeerCaller = null
  // Responder: null | PeerResponder = null
  Peer: null | PeerCaller | PeerResponder = null

  get peerConnection(): RTCPeerConnection {
    return this.Peer!.peerConnection
  }

  constructor() {
    makeAutoObservable(this)
  }

  createPeers(frid: number, toid: number, isCaller: boolean) {
    if (isCaller) {
      this.Peer = new PeerCaller(frid, toid)
    } else {
      this.Peer = new PeerResponder(frid, toid)
    }
    console.log(isCaller, 'isCaller')
    // this.Caller = new PeerCaller(frid, toid)
    // this.Responder = new PeerResponder(frid, toid)
  }

  closeConnection = () => {
    this.Peer?.closeConnection()
  }
}

export default new StoreRoom