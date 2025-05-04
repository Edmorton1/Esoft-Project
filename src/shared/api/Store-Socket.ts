import StoreMessages from "@/pages/Messages/widgets/modules/store/Store-Messages";
import StoreLikes from "@/shared/stores/StoreLikes";
import { URL_SERVER_WS } from "@shared/URLS";
import { frSO } from "@s/infrastructure/db/Mappers";
import { makeAutoObservable, runInAction } from "mobx";

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
    this.socket = runInAction(() => new WebSocket(URL_SERVER_WS))

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
        case "delete_message":
          StoreMessages.socketDelete(data)
          break
        case "edit_message":
          StoreMessages.socketPut(data)
          break

        case "like":
          StoreLikes.socketGet(data)
          break
        case "delete_like":
          StoreLikes.sendDelete(data)
      }

      // setTimeout(() => {this.socket?.send('ПРИВЕТ С КЛИЕНТА'), console.log('СООБЩЕНИЕ ОТПРАВЛЕНО')}, 3000)
    }
    this.socket.onclose = () => {
      console.log('КЛИЕНТ ОТКЛЮЧИЛСЯ')
    }
    // this.socket.send('ZDAROVA S KLIENTA')
  }
}

export default new SocketStore