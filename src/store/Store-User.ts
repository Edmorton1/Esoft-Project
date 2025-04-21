import $api from "@/store/api"
import StoreForm from "@/store/Store-Form"
import storeSocket from "@/store/Store-Socket"
import { Form, User } from "@s/core/domain/Users"
import { FormDTO, UserDTO } from "@s/core/dtoObjects"
import { toSO, toCl } from "@s/infrastructure/db/Mappers"
import { makeAutoObservable, runInAction } from "mobx"

export interface responseInterface {
  user: User,
  accessToken: string
}

class StoreUser {
  constructor() {
    makeAutoObservable(this)
  }
  user: User | null | undefined = undefined

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
  
  registration = async (user: UserDTO): Promise<number> => {
    const request = toCl<responseInterface>((await $api.post(`/registration`, user)))
    // StoreForm.postForm(form)
    localStorage.setItem("accessToken", request.accessToken)

    runInAction(() => this.user = request.user)
    // console.log(request.user)
    return request.user.id
  }
  login = async (data: UserDTO) => {
    const request = toCl<responseInterface>(await $api.post(`/login`, data))
    localStorage.setItem("accessToken", request.accessToken)

    runInAction(() => this.user = request.user)
    await StoreForm.getForm(request.user.id)
    // console.log(request.user)
  }
  logout = async () => {
    const request = toCl(await $api.get(`/logout/${this.user!.id}`))
    localStorage.removeItem("accessToken")
    this.user = null
    StoreForm.form = null
  }
  initial = async () => {
    // console.log('ЗАПРОС ПОШёл')
    const request = toCl<responseInterface>(await $api.get("/refresh"))
    // console.log(request.user)
    if (request?.accessToken) {
      runInAction(() => this.user = request.user)
      await StoreForm.getForm(request.user.id)
      localStorage.setItem("accessToken", request.accessToken)
      await storeSocket.waitSocket(storeSocket.socket!)
      storeSocket.socket!.send(toSO('userid', this.user!.id))
      
    } else {
      this.user = null
      StoreForm.form = null
    }
  }
}

export default new StoreUser()