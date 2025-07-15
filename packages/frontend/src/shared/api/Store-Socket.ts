import StoreLikes from "@app/client/shared/stores/Likes/StoreLikes";
import { frSOCl } from "@app/shared/JSONParsers";
import { makeAutoObservable, runInAction } from "mobx";
import StoreRoom from "@app/client/pages/Room/WebRTC/Store-Room";
import { FormSchema } from "@app/types/gen/Users";
import StoreCall from "@app/client/pages/Room/modules/ModalCall/store/Store-Call";
import StoreTalking from "@app/client/pages/Room/modules/ModalTalking/store/Store-Talking";
import StoreForm from "@app/client/shared/stores/Store-Form";
import StoreMessagesManager from "@app/client/pages/Messages/store/Store-Messages-Manager";
import { assertPeerCaller } from "@app/client/types/TypeGuards";

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
    console.log(_URL_SERVER_WS)
    this.socket = runInAction(() => new WebSocket(_URL_SERVER_WS))

    this.socket.onopen = () => {
      console.log('КЛИЕНТ ПОДКЛЮЧИЛСЯ')
    }
    this.socket.onmessage = (msg) => {
      const {data, type} = frSOCl(msg.data)
      // console.log(data, type)
      switch (type) {
        case "message":
          console.log(data)
          StoreMessagesManager.getOrCreateStore(data.toid)!.socketGet(data)
          break
        case "delete_message":
          StoreMessagesManager.getOrCreateStore(data.fromid).socketDelete(data.mesid, data.fromid);
          break
        case "edit_message":
          StoreMessagesManager.getOrCreateStore(data.toid)!.socketPut(data)
          break

        case "like":
          console.log("LIKE DATA", data)
          StoreLikes.socketGetLike(data)
          break
        case "delete_like":
          console.log("DELETE LIKE DATA", data)
          StoreLikes.socketGetDelete(data)
          break
        case "rejectLike":
          console.log("REJECT LIKE AGREED", data)
          StoreLikes.socketRejectGet(data)
          break

        case "offer": {
          console.log(data);
          const anotherForm = FormSchema.parse(data.frForm)

          StoreTalking.openMount()
          
          StoreCall.anotherForm = anotherForm
          StoreRoom.createPeers(anotherForm.id, data.toid, false).SocketGetOffer(data.description)
          break
        }

        case "answer": {
          console.log('answer socket', data);
          const toForm = FormSchema.parse(data.toForm)
          
          StoreCall.anotherForm = toForm

          console.log(StoreRoom.Peer)
          assertPeerCaller(StoreRoom.Peer!)
          StoreRoom.Peer.SocketGetAnswer(data.description)
          break
        }

        case "candidate":
          // console.log('Отправка кандидатов')
          if (data.isCaller) {
            StoreRoom.Peer!.SocketGetCandidate(data.candidate)
          } else {
            StoreRoom.Peer!.SocketGetCandidate(data.candidate)
          }
          break
        case "cancel":
          console.log("CANCEL CANCEL")
          StoreRoom.cleaning()
          // StoreRoom.SocketGetCandidate(data)
          break
        case "last_active":
          console.log("ПОЛУЧЕН НОВЫЙ last_active", data)
          StoreForm.setLastActive(data)
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