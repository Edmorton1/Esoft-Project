import AudioControl from "@/pages/Room/WebRTC/AudioControl"
import { dataChannelTypes } from "@/pages/Room/WebRTC/config/messageTypes"
import PeerCaller from "@/pages/Room/WebRTC/PeerCaller"
import PeerResponder from "@/pages/Room/WebRTC/PeerResponder"
import VideoControl from "@/pages/Room/WebRTC/VideoControl"
import StoreSocket from "@/shared/api/Store-Socket"
import { LOCAL_AUDIO, LOCAL_VIDEO, REMOTE_VIDEO } from "@shared/CONST"
import { toJSON } from "@shared/MAPPERS"
import { MsgTypesServer, SocketMessageServerInterface } from "@t/gen/types"
import { makeAutoObservable } from "mobx"

class StoreRoom {
  Peer: null | PeerCaller | PeerResponder = null
  isOpen: boolean = false

  audioEnebaled: boolean = false;
  videoEnabled: boolean = false;

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
  getBackStates = () => {
    this.Peer = null
    this.isOpen = false

    this.audioEnebaled = false
    this.videoEnabled = false
  }

  hangUp = () => {
    this.Peer?.hangUp()
    this.getBackStates()
  }

  cleaning = () => {
    this.Peer?.cleaning()
    this.getBackStates()
  }

  cancel = () => {
    StoreSocket.socket?.send(toJSON<SocketMessageServerInterface>({type: "cancel", data: this.Peer!.frid!}))
    this.cleaning()
  }

  // --- БЛОК ВКЛЮЧЕНИЯ ОТКЛЮЧЕНИЯ
  enableAudio = () => {
    this.Peer?.stream?.getAudioTracks().forEach(track => {
			track.enabled = true;
		});
    this.audioEnebaled = true
  }

  disableAudio = () => {
    this.Peer?.stream?.getAudioTracks().forEach(track => {
			track.enabled = false;
		});
    this.audioEnebaled = false
  }
  
  enableVideo = (isLocal: boolean) => {
    const unHideEl = (el: HTMLElement | null) => el && (el.style.display = '')
    if (isLocal) {
      const el = document.getElementById(LOCAL_VIDEO)
      this.Peer?.stream?.getVideoTracks().forEach(track => {
        track.enabled = true;
      });
      this.videoEnabled = true
      el ? unHideEl(el) :  VideoControl.createLocalVideo(this.Peer!.stream!)
      this.Peer?.dataChanel?.send(toJSON<dataChannelTypes>({type: "enablingVideo", data: true}))
    } else {
      const el = document.getElementById(REMOTE_VIDEO)
      unHideEl(el)
    }
  }

  disableVideo = (isLocal: boolean) => {
    const hideEl = (el: HTMLElement | null) => el && (el.style.display = 'none')
    if (isLocal) {
      const el = document.getElementById(LOCAL_VIDEO)
      this.Peer?.stream?.getVideoTracks().forEach(track => {
        track.enabled = false;
      });
      this.videoEnabled = false
      hideEl(el)
      this.Peer?.dataChanel?.send(toJSON<dataChannelTypes>({type: "enablingVideo", data: false}))
    } else {
      const el = document.getElementById(REMOTE_VIDEO)
      hideEl(el)
    }
  }
  // --- БЛОК ВКЛЮЧЕНИЯ ОТКЛЮЧЕНИЯ

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