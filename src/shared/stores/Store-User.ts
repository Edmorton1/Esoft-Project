import $api from "@/shared/api/api"
import StoreForm from "@/shared/stores/Store-Form"
import StoreMessages from "@/pages/Messages/store/Store-Messages"
import storeSocket from "@/shared/api/Store-Socket"
import StoreTags from "@/shared/stores/Store-Tags"
import StoreLikes from "@/shared/stores/StoreLikes"
import { User, UserSchema } from "@t/gen/Users"
import { UserDTO } from "@t/gen/dtoObjects"
import { toCl, toJSON } from "@shared/MAPPERS"
import { serverPaths } from "@shared/PATHS"
import { makeAutoObservable, runInAction } from "mobx"
import { RegistrationDTOClient, StoreUserRegistrationSchema } from "@t/client/RegistrationZOD"
import { UseFormSetError } from "react-hook-form"
import axios from "axios"
import { LoginErrorTypes } from "@s/infrastructure/endpoints/Auth/HttpAuthController"
import StoreLogin from "@/pages/Login/Store-Login"
import { toSOSe } from "@s/WebSocket/JSONParsers"

export interface responseInterface {
  user: User,
  accessToken: string
}

class StoreUser {
  user: User | null | undefined = undefined
  
  constructor() {
    makeAutoObservable(this)
  }

  loadModules = async (logout: boolean = false) => {
    if (!logout) {
      console.log("LOAD MODULES")
      StoreForm.initial()
      StoreLikes.initial()
      // await StoreMessages.initial()
      // await StoreTags.initial()
      console.log("LOADLOADLOADLOADLOADLOADLOADLOADLOADLOADLOADLOADLOADLOADLOADLOADLOADLOADLOAD 2")
      await storeSocket.waitSocket(storeSocket.socket!)
      await storeSocket.socket!.send(toSOSe('userid', this.user!.id))
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
  
  login = (data: UserDTO, setError: UseFormSetError<UserDTO>) => {
    // try {
      $api.post(`${serverPaths.login}`, data)
        .then(data => UserSchema.parse(data.data))
        .then(user => this.user = user)
        .then(() => this.initial())

        .catch(err => {
          if (axios.isAxiosError(err)) {
            const status = err.status
            const response = err.response?.data as LoginErrorTypes
            if (status === 400 && response.type === "email") {
              setError("email", {
                message: response.message,
                type: "manual"
              })
            } else if (status === 400 && response.type === "password") {
              setError("password", {
                message: response.message,
                type: "manual"
              })
            }
          }
        })
      // localStorage.setItem("accessToken", request.accessToken)

      // await this.initial()
    //   StoreLogin.closeModal()
    // } catch(error: unknown) {
    //   console.log(error)
      // if (axios.isAxiosError(error)) {
      //   const status = error.status
      //   const response = error.response?.data as LoginErrorTypes
      //   if (status === 400 && response.type === "email") {
      //     setError("email", {
      //       message: response.message,
      //       type: "manual"
      //     })
      //   } else if (status === 400 && response.type === "password") {
      //     setError("password", {
      //       message: response.message,
      //       type: "manual"
      //     })
      //   }
      // }
    // }
  }

  logout = async () => {
    const request = toCl(await $api.post(serverPaths.logout))
    // localStorage.removeItem("accessToken")
    runInAction(() => this.user = null)
    runInAction(() => StoreForm.form = null)

    this.loadModules(true)
  }

  initial = () => {
    $api.get(serverPaths.initial)
      .then(data => this.user = data.data)
      .then(() => this.loadModules())
      .catch(err => console.log(err))
      
    // if (request?.accessToken) {
    //   runInAction(() => this.user = request.user)
    //   await StoreForm.initial(request.user.id)
    //   // localStorage.setItem("accessToken", request.accessToken)
    //   await storeSocket.waitSocket(storeSocket.socket!)
    //   storeSocket.socket!.send(toSOSe('userid', this.user!.id))

    //   await this.loadModules()
      
    // } else {
    //   this.loadModules(true)
    // }
  }

  registration = async (user: RegistrationDTOClient) => {
    const {avatar, ...body} = user
    const fd = new FormData()
    fd.append('json', toJSON(body))
    if (avatar && typeof avatar === 'object') {
      fd.append('avatar', avatar[0])
    }
    const request = toCl<responseInterface>((await $api.post(`${serverPaths.registration}`, fd, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })))

    const response = StoreUserRegistrationSchema.parse(request)

    console.log(request)
    // localStorage.setItem("accessToken", request.accessToken)

    runInAction(() => this.user = request.user)
    runInAction(() => StoreForm.form = response.form)
    this.initial()
    return request.user.id
  }
}

export default new StoreUser