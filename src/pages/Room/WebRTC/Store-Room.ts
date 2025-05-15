import PeerCaller from "@/pages/Room/WebRTC/PeerCaller"
import PeerResponder from "@/pages/Room/WebRTC/PeerResponder"
import { makeAutoObservable } from "mobx"

class StoreRoom {
  Caller: null | PeerCaller = null
  Responder: null | PeerResponder = null

  constructor() {
    makeAutoObservable(this)
  }

  createPeers(frid: number, toid: number) {
    this.Caller = new PeerCaller(frid, toid)
    this.Responder = new PeerResponder(frid, toid)
  }

  get callChannel() {
    return this.Caller?.dataChanel
  }
  get resChannel() {
    return this.Responder?.dataChanel
  }
}

export default new StoreRoom