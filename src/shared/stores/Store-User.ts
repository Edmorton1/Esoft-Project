import $api from "@/shared/api/api"
import StoreForm from "@/shared/stores/Store-Form"
import StoreMessages from "@/pages/Messages/store/Store-Messages"
import storeSocket from "@/shared/api/Store-Socket"
import StoreTags from "@/shared/stores/Store-Tags"
import StoreLikes from "@/shared/stores/StoreLikes"
import { User } from "@t/gen/Users"
import { UserDTO } from "@t/gen/dtoObjects"
import { toSOSe, toCl, toJSON } from "@shared/MAPPERS"
import { serverPaths } from "@shared/PATHS"
import { makeAutoObservable, runInAction } from "mobx"
import { RegistrationDTOClient, StoreUserRegistrationSchema } from "@/pages/Registration/widgets/RegistrationWidget/modules/types/RegistrationZOD"
import { UseFormSetError } from "react-hook-form"
import axios from "axios"
import { LoginErrorTypes } from "@s/infrastructure/endpoints/Token/HttpTokenController"

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
  
  login = async (data: UserDTO, setError: UseFormSetError<UserDTO>) => {
    try {
      const request = toCl<responseInterface>(await $api.post(`${serverPaths.login}`, data))
      localStorage.setItem("accessToken", request.accessToken)

      await this.initial()
    } catch(error: unknown) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        const status = error.status
        const response = error.response?.data as LoginErrorTypes
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
    }

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
    console.log(request, 'request')
    if (request?.accessToken) {
      runInAction(() => this.user = request.user)
      await StoreForm.initial(request.user.id)
      localStorage.setItem("accessToken", request.accessToken)
      await storeSocket.waitSocket(storeSocket.socket!)
      storeSocket.socket!.send(toSOSe('userid', this.user!.id))

      await this.loadModules()
      
    } else {
      this.loadModules(true)
    }
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
    localStorage.setItem("accessToken", request.accessToken)

    runInAction(() => this.user = request.user)
    runInAction(() => StoreForm.form = response.form)
    this.initial()
    return request.user.id
  }
}

export default new StoreUser