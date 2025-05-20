import BasePeer from "@/pages/Room/WebRTC/BasePeer"
import PeerCaller from "@/pages/Room/WebRTC/PeerCaller"
import PeerResponder from "@/pages/Room/WebRTC/PeerResponder"
import StoreSocket from "@/shared/api/Store-Socket"
import { toSOSe } from "@shared/MAPPERS"
import { makeAutoObservable } from "mobx"

class StoreRoom {
  Peer: null | PeerCaller | PeerResponder = null
  isOpen: boolean = false

  get peerConnection(): RTCPeerConnection {
    return this.Peer!.peerConnection
  }

  constructor() {
    makeAutoObservable(this)
  }

  makeCall = (frid: number, toid: number) => {
    this.Peer = new PeerCaller(frid, toid)
    this.Peer.createOffer()
  }

  createPeers (frid: number, toid: number, isCaller: true): PeerCaller
  createPeers (frid: number, toid: number, isCaller: false): PeerResponder
  createPeers (frid: number, toid: number, isCaller: boolean) {
    if (isCaller) {
      this.Peer = new PeerCaller(frid, toid)
    } else {
      this.Peer = new PeerResponder(frid, toid)
    }
    console.log(isCaller, 'isCaller')

    return this.Peer
  }

  // get isOpen() {
  //   const canal = this.Peer?.dataChanel?.readyState
  //   console.log('canal', canal)
  //   return canal === 'open'
  // }
  // setOpenTrue() {
  //   // const canal = this.Peer?.dataChanel?.readyState
  //   // console.log('canal', canal)
  //   // this.isOpen = canal === 'open'
  //   console.log("СТАВЛЮ ОПЕН")
  //   this.isOpen = true
  // }

  close = () => {
    this.Peer = null
  }
}

export default new StoreRoom