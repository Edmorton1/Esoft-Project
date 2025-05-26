import setupPeerConnection from "@/pages/Room/WebRTC/config/peerConnectionConfig";
import { LOCAL_AUDIO, LOCAL_VIDEO, REMOTE_AUDIO, REMOTE_VIDEO } from "@shared/CONST";
import { toJSON } from "@shared/MAPPERS";

abstract class BasePeer {
	peerConnection = new RTCPeerConnection();
	dataChanel: null | RTCDataChannel = null;

	stream: MediaStream | null = null;

	constructor(
		readonly frid: number,
		readonly toid: number,
	) {
    this.peerConnection = setupPeerConnection(this.peerConnection, this.dataChanel!)
	}

  hangUp = () => {
    console.log("HANG UP")
    this.dataChanel!.send(toJSON({type: 'hangUp'}))

    this.stream?.getTracks().forEach(track => track.stop())
    this.stream = null

    this.dataChanel?.close()
    this.dataChanel = null

    this.peerConnection.getSenders().forEach(sender => this.peerConnection.removeTrack(sender))
    this.peerConnection.close()

    this.peerConnection = new RTCPeerConnection()

    document.getElementById(REMOTE_VIDEO)?.remove()
    document.getElementById(LOCAL_VIDEO)?.remove()
    document.getElementById(REMOTE_AUDIO)?.remove()
    document.getElementById(LOCAL_AUDIO)?.remove()
  }

  updateDataChannel = (dataChanel: RTCDataChannel) => {
    this.dataChanel = dataChanel
  }

	SocketGetCandidate = async (candidate: RTCIceCandidate) => {
		this.peerConnection.addIceCandidate(candidate);
	};

	sendMessageCaller = () => {
    console.log("ASASDASDASD", this.dataChanel!.readyState)
		this.dataChanel!.send('text');
	};
}

export default BasePeer;
