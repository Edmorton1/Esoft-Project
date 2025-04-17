import $api from "@/store/api"
import storeSocket from "@/store/store-socket"
import { User } from "@s/core/domain/Users"
import { UserDTO } from "@s/core/dtoObjects"
import { frSO, toCl } from "@s/infrastructure/db/Mappers"
import { makeAutoObservable, runInAction } from "mobx"

export interface responseInterface {
  user: User,
  accessToken: string
}

class AuthorizationStore {
  constructor() {
    makeAutoObservable(this)
  }
  user: User = null

  registration = async (data: UserDTO) => {
    const request: responseInterface = toCl(await $api.post(`/registration`, data))
    localStorage.setItem("accessToken", request.accessToken)
    runInAction(() => this.user = request.user)
    console.log(request.user)
  }
  login = async (data: UserDTO) => {
    const request: responseInterface = toCl(await $api.post(`/login`, data))
    localStorage.setItem("accessToken", request.accessToken)
    runInAction(() => this.user = request.user)
    console.log(request.user)
  }
  logout = async () => {
    const request = toCl(await $api.get(`/logout/${this.user.id}`))
    localStorage.removeItem("accessToken")
    this.user = null
    console.log('asdsd')
  }
  initializing = async () => {
    console.log('ЗАПРОС ПОШёл')
    const request: responseInterface = toCl(await $api.get("/refresh"))
    // console.log(request.user)
    if (request?.accessToken) {
      runInAction(() => this.user = request.user)
      localStorage.setItem("accessToken", request.accessToken)
      await storeSocket.waitSocket(storeSocket.socket)
      storeSocket.socket.send(frSO('userid', this.user.id))
    }
  }
}

export default new AuthorizationStore()