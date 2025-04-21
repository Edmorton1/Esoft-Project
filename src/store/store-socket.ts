import StoreMessages from "@/store/Store-Messages";
import StoreLikes from "@/store/StoreLikes";
import { URL_CLIENT_WS, URL_SERVER_WS } from "@/URLS";
import { frSO } from "@s/infrastructure/db/Mappers";
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

  waitSocket(socket: WebSocket): Promise<void> {
    return new Promise(resolve => {
      if (socket.readyState === WebSocket.OPEN) {
        resolve()
      } else {
        socket.addEventListener('open', () => resolve(), {once: true})
      }
    })
  }
  
  connection = async () => {
    this.socket = new WebSocket(URL_SERVER_WS)

    this.socket.onopen = (msg) => {
      console.log('КЛИЕНТ ПОДКЛЮЧИЛСЯ')
    }
    this.socket.onmessage = (msg) => {
      const {data, type} = frSO(msg.data)
      switch (type) {
        case "message":
          console.log(data)
          StoreMessages.socketGet(data)
          break
        case "deleteMessage":
          StoreMessages.socketDelete(data)
          break
        case "editMessage":
          StoreMessages.socketPut(data)
          break

        case "like":
          StoreLikes.socketGet(data)
          break
      }

      // setTimeout(() => {this.socket?.send('ПРИВЕТ С КЛИЕНТА'), console.log('СООБЩЕНИЕ ОТПРАВЛЕНО')}, 3000)
    }
    this.socket.onclose = () => {
      console.log('КЛИЕНТ ОТКЛЮЧИЛСЯ')
    }
    // this.socket.send('ZDAROVA S KLIENTA')
  }
}

export default new SocketStore()