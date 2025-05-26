import setupPeerConnection from "@/pages/Room/WebRTC/config/peerConnectionConfig";

abstract class BasePeer {
	peerConnection = new RTCPeerConnection();
	dataChanel: null | RTCDataChannel = null;

	offer: RTCSessionDescriptionInit | null = null;
	answer: RTCSessionDescriptionInit | null = null;

	stream: MediaStream | null = null;

	constructor(
		readonly frid: number,
		readonly toid: number,
	) {
    this.peerConnection = setupPeerConnection(this.peerConnection, this.dataChanel!)
	}

	SocketGetCandidate = async (candidate: RTCIceCandidate) => {
		this.peerConnection.addIceCandidate(candidate);
	};

	sendMessageCaller = (text: string) => {
		this.dataChanel?.send(text);
	};
}

export default BasePeer;
