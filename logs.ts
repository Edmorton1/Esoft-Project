const peerConnection = new RTCPeerConnection()
// undefined
const dataChanel = peerConnection.createDataChannel('test')
// undefined
dataChanel.onopen = () => console.log('Channel opened!')
// () => console.log('Channel opened!')
dataChanel.onmessage = e => console.log('Message', e.data)
// e => console.log('Message', e.data)
peerConnection.onicecandidate = e => console.log('icecandidate', JSON.stringify(peerConnection.localDescription))
// e => console.log('icecandidate', JSON.stringify(peerConnection.localDescription))
const offer = await peerConnection.createOffer()
// undefined
peerConnection.setLocalDescription(offer)
// Promise {<pending>}

// icecandidate {"type":"offer","sdp":"v=0\r\no=- 8035582945749711681 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:813987313 1 udp 2113937151 86963798-428b-4f73-99fd-b503fc9e7261.local 52758 typ host generation 0 network-cost 999\r\na=ice-ufrag:Aeqr\r\na=ice-pwd:2ROswwA0/fTU7eHnS0sGxMQ1\r\na=ice-options:trickle\r\na=fingerprint:sha-256 25:7D:7B:1C:D0:15:09:AD:D6:EF:C9:0F:37:62:CB:28:70:74:C7:00:83:77:15:49:DE:DC:08:E8:9F:4E:BF:31\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}

// ПОТОМ ИДУТ МАХИНАЦИИ НА ДРУГОМ БРАУЗЕРЕ

const answer = {"type":"answer","sdp":"v=0\r\no=- 8373933126683409288 3 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:3261939081 1 udp 2113937151 4ac42386-4d00-46e4-b15e-09eff84a44e2.local 52800 typ host generation 0 network-cost 999\r\na=ice-ufrag:gkbV\r\na=ice-pwd:EDI1Fjm62dLoA+BRH5LoH0hp\r\na=ice-options:trickle\r\na=fingerprint:sha-256 C3:8A:62:9C:AA:A9:97:1E:1D:84:14:3D:68:E2:32:97:F7:5A:D5:A2:A6:0C:4E:19:3A:8C:7C:A0:6C:37:13:56\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}
// undefined
peerConnection.setRemoteDescription(answer)
// Promise {<pending>}
// VM355:1 Channel opened!



// ДРУГОЙ БРАУЗЕР
const peerConnection = new RTCPeerConnection()
// undefined
const offer = {"type":"offer","sdp":"v=0\r\no=- 8035582945749711681 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:813987313 1 udp 2113937151 86963798-428b-4f73-99fd-b503fc9e7261.local 52758 typ host generation 0 network-cost 999\r\na=ice-ufrag:Aeqr\r\na=ice-pwd:2ROswwA0/fTU7eHnS0sGxMQ1\r\na=ice-options:trickle\r\na=fingerprint:sha-256 25:7D:7B:1C:D0:15:09:AD:D6:EF:C9:0F:37:62:CB:28:70:74:C7:00:83:77:15:49:DE:DC:08:E8:9F:4E:BF:31\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}
// undefined
peerConnection.onicecandidate = e => console.log('icecandidate', JSON.stringify(peerConnection.localDescription))
// e => console.log('icecandidate', JSON.stringify(peerConnection.localDescription))
peerConnection.setRemoteDescription(offer)
// Promise {<pending>}

let dataChannel;

peerConnection.ondatachannel = event => {
    dataChanel = event.channel;
    dataChanel.onopen = () => console.log('Channel opened!')
    dataChanel.onmessage = e => console.log('Message', e.data)
}
// event => {
//     dataChanel = event.channel;
//     dataChanel.onopen = () => console.log('Channel opened!')
//     dataChanel.onmessage = e => console.log('Message', e.data)
// }

const answer = peerConnection.createAnswer()
// undefined
peerConnection.setLocalDescription(await peerConnection.createAnswer());
// Promise {<pending>}
// 2VM292:1 icecandidate {"type":"answer","sdp":"v=0\r\no=- 8373933126683409288 3 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:3261939081 1 udp 2113937151 4ac42386-4d00-46e4-b15e-09eff84a44e2.local 52800 typ host generation 0 network-cost 999\r\na=ice-ufrag:gkbV\r\na=ice-pwd:EDI1Fjm62dLoA+BRH5LoH0hp\r\na=ice-options:trickle\r\na=fingerprint:sha-256 C3:8A:62:9C:AA:A9:97:1E:1D:84:14:3D:68:E2:32:97:F7:5A:D5:A2:A6:0C:4E:19:3A:8C:7C:A0:6C:37:13:56\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}
// VM516:5 Channel opened!