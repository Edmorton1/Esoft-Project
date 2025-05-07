import $api from "@/shared/api/api"
import StoreForm from "@/shared/stores/Store-Form"
import StoreMessages from "@/pages/Messages/widgets/modules/store/Store-Messages"
import storeSocket from "@/shared/api/Store-Socket"
import StoreTags from "@/shared/stores/Store-Tags"
import StoreLikes from "@/shared/stores/StoreLikes"
import { Form, User } from "@s/core/domain/Users"
import { FormDTO, UserDTO } from "@s/core/dtoObjects"
import { toSO, toCl } from "@shared/MAPPERS"
import { serverPaths } from "@shared/PATHS"
import { makeAutoObservable, runInAction } from "mobx"

export interface responseInterface {
  user: User,
  accessToken: string
}

class StoreUser {
  user: User | null | undefined = undefined
  
  constructor() {
    makeAutoObservable(this)
  }

  // waitUser(): Promise<void> {
  //   return new Promise(resolve => {
  //     if (this.user !== undefined) {
  //       resolve()
  //     } else {
  //       const interval = setInterval(() => {
  //         console.log('ЖДЁМ')
  //         if (this.user !== undefined) {
  //           clearInterval(interval)
  //           resolve()
  //         }
  //       }, 100)
  //     }
  //   })
  // }

  loadModules = async (logout: boolean = false) => {
    if (!logout) {
      await StoreLikes.initial()
      await StoreMessages.initial()
      await StoreTags.initial()
    } else {
      runInAction(() => {
        this.user = null;
        StoreForm.form = null;
        StoreTags.tags = null;
        StoreLikes.likes = null;
        StoreMessages.messages = null;
      })
    }
  }
  
  registration = async (user: UserDTO): Promise<number> => {
    const request = toCl<responseInterface>((await $api.post(`${serverPaths.registration}`, user)))
    localStorage.setItem("accessToken", request.accessToken)

    runInAction(() => this.user = request.user)
    this.initial()
    return request.user.id
  }
  
  login = async (data: UserDTO) => {
    const request = toCl<responseInterface>(await $api.post(`${serverPaths.login}`, data))
    localStorage.setItem("accessToken", request.accessToken)

    await this.initial()
  }

  logout = async () => {
    const request = toCl(await $api.get(`${serverPaths.logout}/${this.user!.id}`))
    localStorage.removeItem("accessToken")
    runInAction(() => this.user = null)
    runInAction(() => StoreForm.form = null)

    this.loadModules(true)
  }

  initial = async () => {
    const request = toCl<responseInterface>(await $api.get(serverPaths.refresh))
    if (request?.accessToken) {
      runInAction(() => this.user = request.user)
      await StoreForm.initial(request.user.id)
      localStorage.setItem("accessToken", request.accessToken)
      await storeSocket.waitSocket(storeSocket.socket!)
      storeSocket.socket!.send(toSO('userid', this.user!.id))

      await this.loadModules()
      
    } else {
      this.loadModules(true)
    }
  }
}

export default new StoreUser