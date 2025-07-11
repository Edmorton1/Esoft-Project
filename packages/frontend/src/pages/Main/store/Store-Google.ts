import $api from "@app/client/shared/api/api"
import { serverPaths } from "@app/shared/PATHS"
import { makeAutoObservable } from "mobx"

class StoreGoogle {
  constructor () {
    makeAutoObservable(this)
  }
  url: string | null = null

  getAuthUrl = async () => {
    const {data} = await $api.get(serverPaths.googleGetAuthUrl)
    console.log("AUTH URL", data)
    this.url = data.url
  }
}

export default new StoreGoogle