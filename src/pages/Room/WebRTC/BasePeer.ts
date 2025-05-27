import { dataChannelTypes } from "@/pages/Room/WebRTC/config/messageTypes";
import setupPeerConnection from "@/pages/Room/WebRTC/config/peerConnectionConfig";
import MediaPermissions from "@/pages/Room/WebRTC/MediaPermissions";
import StoreRoom from "@/pages/Room/WebRTC/Store-Room";
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
    this.peerConnection = setupPeerConnection(this.peerConnection)
	}

  cleaning = () => {
    console.log('ПОЛНАЯ ОЧИСТКА')
    this.stream?.getTracks().forEach(track => track.stop())
    this.stream = null

    this.peerConnection.getSenders().forEach(sender => this.peerConnection.removeTrack(sender))
    this.peerConnection.close();

    [REMOTE_VIDEO, REMOTE_AUDIO, LOCAL_VIDEO, LOCAL_AUDIO].forEach(id => {
      document.getElementById(id)?.remove()
    })

    this.peerConnection = setupPeerConnection(new RTCPeerConnection())

    this.dataChanel?.close()
    this.dataChanel = null
  }

  hangUp = () => {
    console.log("HANG UP")
    this.dataChanel!.send(toJSON<dataChannelTypes>({type: 'hangUp'}))

    this.cleaning()
  }

  updateDataChannel = (dataChanel: RTCDataChannel) => {
    this.dataChanel = dataChanel
  }

	SocketGetCandidate = async (candidate: RTCIceCandidate) => {
    const callback = async () => {
      if (this.peerConnection.remoteDescription) {
        console.log("REMOTE EST")
        this.peerConnection.addIceCandidate(candidate);
      } else {
        console.log("WAITING")
        setTimeout(() => callback(), 50) 
      }
    }

    callback()
	};

	sendMessageCaller = () => {
    console.log("ASASDASDASD", this.dataChanel!.readyState)
		this.dataChanel!.send('text');
	};

  enableStreams = async () => {
    const [stream, videoAllowed, audioAllowed] = await MediaPermissions.setMediaStream(this.peerConnection)
    console.log('[CHECK STREAM TRACKS]', stream.getTracks().map(t => t.kind))
    this.stream = stream

    videoAllowed && StoreRoom.enableVideo(true)
    audioAllowed && StoreRoom.enableAudio()
    console.log("[ENABLE STREAMS]: УСТАНОВЛЕН!!!")
  }
}

export default BasePeer;
