import setupPeerConnection from "@/pages/Room/WebRTC/config/peerConnectionConfig";
import MediaPermissions from "@/pages/Room/WebRTC/MediaPermissions";
import StoreRoom from "@/pages/Room/WebRTC/Store-Room";
import VideoControl from "@/pages/Room/WebRTC/VideoControl";
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
    const func = async () => {
      if (this.peerConnection.remoteDescription) {
        console.log("REMOTE EST")
        this.peerConnection.addIceCandidate(candidate);
      } else {
        console.log("WAITING")
        setTimeout(() => func(), 50) 
      }
    }

    func()
    // const asd = await new Promise(res => {
    //   if (this.peerConnection.remoteDescription) {
        
    //   }
    // })
	};

	sendMessageCaller = () => {
    console.log("ASASDASDASD", this.dataChanel!.readyState)
		this.dataChanel!.send('text');
	};

  enableStreams = async () => {
    const [stream, videoAllowed, audioAllowed] = await MediaPermissions.setMediaStream(this.peerConnection)
    console.log('[CHECK STREAM TRACKS]', stream.getTracks().map(t => t.kind))
    this.stream = stream

    StoreRoom.enableVideo()
    StoreRoom.enableAudio()

    videoAllowed && VideoControl.createLocalVideo(stream)
    console.log("[ENABLE STREAMS]: УСТАНОВЛЕН!!!")
  }
}

export default BasePeer;
