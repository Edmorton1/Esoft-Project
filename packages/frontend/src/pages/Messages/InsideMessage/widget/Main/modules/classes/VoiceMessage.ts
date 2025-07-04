import StoreMessages from "@app/client/pages/Messages/store/Store-Messages";
import StoreMessagesManager from "@app/client/pages/Messages/store/Store-Messages-Manager";
import { fileToFileList } from "@app/client/shared/funcs/filefuncs";
import StoreForm from "@app/client/shared/stores/Store-Form";
import { blobToFile } from "@app/shared/MAPPERS";

class VoiceMessage {
  mediaRecorder: MediaRecorder;

  chunks: any[] = [];

  constructor(
    readonly stream: MediaStream,
    readonly toid: number
  ) {
    this.mediaRecorder = new MediaRecorder(this.stream, {
      mimeType: "audio/webm"
    })
    console.log('Аудио установилось', stream)
    
    this.mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) {
        this.chunks.push(e.data)
      }
    }
    
    this.mediaRecorder.onstop = () => {
      document.getElementById('local-audio')?.remove()
      const blob = new Blob(this.chunks, {type: 'audio/ogg'})
      console.log(blob)
      const url = URL.createObjectURL(blob)
      const audio = document.createElement('audio')
      audio.controls = true
      audio.src = url
    
      // document.body.appendChild(audio)
      return blob
      // audio.click()
      // URL.revokeObjectURL(url)
    }

    this.mediaRecorder.onstart = e => {
      const audio = document.createElement('audio')
      audio.id = 'local-audio'
      audio.srcObject = this.stream
      audio.autoplay = true
      // audio.muted = false
      audio.muted = true
      // document.body.appendChild(audio)
    }
  }

  start() {
    console.log('ЗАПИСЬ НАЧАЛАСЬ')
    this.mediaRecorder.start()  
  }

  stop = async () => {
    console.log('ЗАПИСЬ ЗАВЕРШИЛАСЬ')

    const stopping = new Promise<Blob>(res => {
      this.mediaRecorder.onstop = () => {
      document.getElementById('local-audio')?.remove()
      const blob = new Blob(this.chunks, {type: 'audio/ogg'})
      console.log(blob)
      const url = URL.createObjectURL(blob)
      const audio = document.createElement('audio')
      audio.controls = true
      audio.src = url
    
      // document.body.appendChild(audio)

      res(blob)
    }
    this.mediaRecorder.stop()
  })
  const blob = await stopping
  // console.log('blob aswa', blob)
  const file = blobToFile(blob, "file")
  const filelist = fileToFileList(file)

  StoreMessagesManager.getOrCreateStore(this.toid)!.send({
    text: 'test voice2',
    files: filelist
  }, this.toid)

  this.stream.getTracks().forEach(track => track.stop())
  }

  media() {
    console.log(this.mediaRecorder)
  }
}

export default VoiceMessage