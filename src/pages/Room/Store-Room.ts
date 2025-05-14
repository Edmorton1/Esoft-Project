import StoreSocket from "@/shared/api/Store-Socket";
import { toJSON, toSOSe } from "@shared/MAPPERS";

class StoreRoom {
  peerConnection: RTCPeerConnection | null = null;
  dataChanel: RTCDataChannel | null = null;

  sendOffer = (id: number, description: RTCSessionDescription) => {
    console.log(this.peerConnection, this.dataChanel)
    StoreSocket.socket?.send(toSOSe('offer', {id: id, description: description}))
  }

  SocketGetOffer = (offer: RTCSessionDescription) => {
    console.log("SOCKET GET OFFER", offer)
    this.peerConnection?.setRemoteDescription(offer)
  }
}

export default new StoreRoom