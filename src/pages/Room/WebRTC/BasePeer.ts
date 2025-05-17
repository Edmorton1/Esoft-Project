import setupDataChannel from "@/pages/Room/dataChannelConfig";
import StoreSocket from "@/shared/api/Store-Socket";
import StoreUser from "@/shared/stores/Store-User";
import { toSOSe } from "@shared/MAPPERS";

abstract class BasePeer {
  peerConnection = new RTCPeerConnection;
  dataChanel: null | RTCDataChannel = null;

  offer: RTCSessionDescriptionInit | null = null;
  answer: RTCSessionDescriptionInit | null = null;

  constructor(
    readonly frid: number,
    readonly toid: number
  ) {
    this.peerConnection.onicecandidate = e => console.log('icecandidate', JSON.stringify(this.peerConnection.localDescription))

    this.peerConnection.ondatachannel = e => {
      if (!this.dataChanel) {
        console.log("ПОМЕНЯЛСЯ datachannel")
        this.dataChanel = setupDataChannel(e.channel)
      }
    }
    this.peerConnection.ontrack = e => {
      const remoteStream = e.streams[0]
      const audio = document.createElement('audio')
      audio.srcObject = remoteStream;
      audio.autoplay = true
      document.body.appendChild(audio)
    }
  }

  SocketGetCandidate = async (candidate: RTCIceCandidate) => {
    this.peerConnection.addIceCandidate(candidate)
  }

  closeConnection = () => {
    this.peerConnection.close()
  }

  sendMessageCaller = (text: string) => {
    this.dataChanel?.send(text)
  }
}

export default BasePeer