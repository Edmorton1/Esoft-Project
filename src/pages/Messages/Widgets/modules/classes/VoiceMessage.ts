import { blobToFile } from "@shared/MAPPERS";

class VoiceMessage {
  mediaRecorder: MediaRecorder;

  chunks: any[] = [];

  constructor(
    readonly stream: MediaStream,
    readonly toid: number
  ) {
    this.mediaRecorder = new MediaRecorder(this.stream)
    console.log('Аудио установилось', stream)
    
    this.mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) {
        this.chunks.push(e.data)
      }
    }
    
    this.mediaRecorder.onstop = () => {
      document.getElementById('micro')?.remove()
      const blob = new Blob(this.chunks, {type: 'audio/ogg'})
      console.log(blob)
      const url = URL.createObjectURL(blob)
      const audio = document.createElement('audio')
      audio.controls = true
      audio.src = url
    
      document.body.appendChild(audio)
      return blob
      // audio.click()
      // URL.revokeObjectURL(url)
    }

    this.mediaRecorder.onstart = e => {
      const audio = document.createElement('audio')
      audio.id = 'micro'
      audio.srcObject = this.stream
      audio.autoplay = true
      audio.muted = false
      document.body.appendChild(audio)
    }
  }

  start() {
    console.log('ЗАПИСЬ НАЧАЛАСЬ')
    this.mediaRecorder.start()  
  }

  async stop() {
    console.log('ЗАПИСЬ ЗАВЕРШИЛАСЬ')

    const stopping = new Promise<Blob>(res => {
      this.mediaRecorder.onstop = () => {
      document.getElementById('micro')?.remove()
      const blob = new Blob(this.chunks, {type: 'audio/ogg'})
      console.log(blob)
      const url = URL.createObjectURL(blob)
      const audio = document.createElement('audio')
      audio.controls = true
      audio.src = url
    
      document.body.appendChild(audio)

      res(blob)
    }
    this.mediaRecorder.stop()
  })
  const blob = await stopping
  // console.log('blob aswa', blob)
  const file = blobToFile(blob, "file")
  console.log(file)
  }

  media() {
    console.log(this.mediaRecorder)
  }
}

export default VoiceMessage