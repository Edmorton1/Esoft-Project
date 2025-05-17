const setupDataChannel = (channel: RTCDataChannel, event?: RTCDataChannelEvent): RTCDataChannel => {
  if (event) {
    channel = event.channel
  }
  console.log('SETUP DATA')

  channel!.onopen = () => console.log('Channel opened!')
  channel.onmessage = e => console.log('Message', e.data)
  channel.onclose = () => console.log('CLOSE: КАНАЛ ЗАКРЫЛСЯ')

  return channel
}

export default setupDataChannel