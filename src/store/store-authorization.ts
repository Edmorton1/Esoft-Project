import $api from "@/store/api"
import { toCl } from "@/store/Mappers"
import { User } from "@s/core/domain/Users"
import { UserDTO } from "@s/core/repositories/dto/dtoObjects"
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
      localStorage.setItem("accessToken", request.accessToken)
      runInAction(() => this.user = request.user)
    }
  }
}

export default new AuthorizationStore()