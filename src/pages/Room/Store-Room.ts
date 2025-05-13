import StoreSocket from "@/shared/api/Store-Socket";
import { toJSON } from "@shared/MAPPERS";
import { makeAutoObservable } from "mobx";

class StoreRoom {
  
  sendOffer() {
    StoreSocket.socket?.send(toJSON({data: "Zdarova", type: "offer"}))
  }
}

export default new StoreRoom