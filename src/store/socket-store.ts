import { URL_CLIENT_WS, URL_SERVER_WS } from "@/URLS";
import { makeAutoObservable } from "mobx";

class SocketStore {
  socket: WebSocket | null = null
  constructor() {
    makeAutoObservable(this)
  }

  // send = (msg: string) => {
  //   if (this.socket.readyState === 1) {

  //   }
  // }
  connection = async () => {
    this.socket = new WebSocket(URL_SERVER_WS)

    this.socket.onopen = (msg) => {
      console.log('КЛИЕНТ ПОДКЛЮЧИЛСЯ')
    }
    this.socket.onmessage = (msg) => {
      console.log(msg.data)

      // setTimeout(() => {this.socket?.send('ПРИВЕТ С КЛИЕНТА'), console.log('СООБЩЕНИЕ ОТПРАВЛЕНО')}, 3000)
    }
    this.socket.onclose = () => {
      console.log('КЛИЕНТ ОТКЛЮЧИЛСЯ')
    }
    // this.socket.send('ZDAROVA S KLIENTA')
  }
}

export default new SocketStore()