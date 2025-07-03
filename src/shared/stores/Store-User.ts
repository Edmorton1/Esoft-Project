import $api from "@/shared/api/api"
import StoreForm from "@/shared/stores/Store-Form"
import storeSocket from "@/shared/api/Store-Socket"
// import StoreTags from "@/shared/stores/Store-Tags"
import StoreLikes from "@/shared/stores/StoreLikes"
import { User, UserSchema } from "@t/gen/Users"
import { UserDTO } from "@t/gen/dtoObjects"
import { toCl, toJSON } from "@shared/MAPPERS"
import { paths, serverPaths } from "@shared/PATHS"
import { makeAutoObservable, runInAction } from "mobx"
import { RegistrationDTOClient, StoreUserRegistrationSchema } from "@t/client/RegistrationZOD"
import { UseFormSetError } from "react-hook-form"
import axios from "axios"
import { toSOSe } from "@shared/JSONParsers"
import StoreLogin from "@/shared/ui/modals/Login/stores/Store-Login"
import StorePairs from "@/pages/Pairs/widgets/stores/Store-Pairs"
import { LoginErrorTypes } from "@t/gen/ErrorTypes"

export interface responseInterface {
  user: User,
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
      StorePairs.initial()
      // await StoreMessages.initial()
      // await StoreTags.initial()
      console.log("RELOAD 2")
      await storeSocket.waitSocket(storeSocket.socket!)
      await storeSocket.socket!.send(toSOSe('userid', this.user!.id))
    } else {
      runInAction(() => {
        this.user = null;
        StoreForm.form = null;
        // StoreTags.tags = null;
        StoreLikes.likes = null;
        StorePairs.pairs = []
      })
    }
  }
  
  login = (data: UserDTO, setError: UseFormSetError<UserDTO>, navigate: Function, reset: Function) => {
    // try {
      $api.post(`${serverPaths.login}`, data)
        .then(data => UserSchema.parse(data.data))
        .then(user => runInAction(() => this.user = user))
        .then(() => this.initial())
        .then(() => StoreLogin.closeModal())
        .then(() => navigate(`${paths.profile}/${this.user?.id}`))
        .then(() => reset())

        .catch(err => {
          if (axios.isAxiosError(err)) {
            const status = err.status
            const response = err.response?.data as LoginErrorTypes
            if (status === 401 && response.type === "email") {
              setError("email", {
                message: response.message,
                type: "manual"
              })
            } else if (status === 401 && response.type === "password") {
              setError("password", {
                message: response.message,
                type: "manual"
              })
            }
          }
        })
  }

  logout = async () => {
    const request = toCl(await $api.post(serverPaths.logout))
    runInAction(() => {
      this.user = null
      StoreForm.form = null
    })

    this.loadModules(true)
  }

  initial = () => {
    $api.get(serverPaths.initial)
      .then(data => runInAction(() => this.user = data.data))
      .then(() => this.loadModules())

      .catch(err => console.log(err))
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

    runInAction(() => {
      this.user = request.user
      StoreForm.form = response.form
    })

    this.initial()
    return request.user.id
  }
}

export default new StoreUser