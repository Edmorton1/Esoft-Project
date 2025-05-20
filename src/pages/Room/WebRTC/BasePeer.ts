import setupDataChannel from "@/pages/Room/dataChannelConfig";

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
    // РЕАКЦИЯ НА ЧУЖОЙ ТРЕК
    this.peerConnection.ontrack = e => {
      console.log('track', e.track)
      const isVideo = e.track.kind === 'video'
      console.log('isVideo', e.track.kind)
      const remoteStream = e.streams[0]
      if (isVideo) {
        const remoteVideo = document.createElement('video');
        remoteVideo.srcObject = remoteStream;
        remoteVideo.autoplay = true;
        remoteVideo.controls = true;
        remoteVideo.style.width = '300px';
        remoteVideo.id = 'remote-video'
        document.body.appendChild(remoteVideo)
      } else {
        const remoteAudio = document.createElement('audio')
        remoteAudio.srcObject = remoteStream;
        remoteAudio.autoplay = true
        remoteAudio.id = 'remote-audio'
        document.body.appendChild(remoteAudio)
      }
    }
  }

  SocketGetCandidate = async (candidate: RTCIceCandidate) => {
    this.peerConnection.addIceCandidate(candidate)
  }

  sendMessageCaller = (text: string) => {
    this.dataChanel?.send(text)
  }
}

export default BasePeer