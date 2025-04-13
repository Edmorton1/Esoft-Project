import $api from "@/store/api"
import { toCl } from "@/store/Mappers"
import { URL_SERVER } from "@/URLS"
import { User } from "@s/core/domain/Users"
import { UserDTO } from "@s/core/repositories/dto/dtoObjects"
import { makeAutoObservable, runInAction } from "mobx"

interface responseInterface {
  user: User,
  accessToken: string
}

class AuthorizationStore {
  constructor() {
    makeAutoObservable(this)
  }
  user: User = null

  registration = async () => {

  }
  login = async (data: UserDTO) => {
    const request: responseInterface = toCl(await $api.post(`${URL_SERVER}/login`, data))
    localStorage.setItem("accessToken", request.accessToken)
    runInAction(() => this.user = request.user)
    console.log(request.user)
  }
  logout = async () => {
    
  }
  refresh = async () => {
    
  }
}

export default new AuthorizationStore()