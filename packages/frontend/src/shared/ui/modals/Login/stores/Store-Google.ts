import $api from "@app/client/shared/api/api"
import { serverPaths } from "@app/shared/PATHS"

class StoreGoogle {
  enterWithGoogle = async () => {
    const {data} = await $api.get(serverPaths.googleGetAuthUrl)
    console.log("AUTH URL", data)
    window.location.href = data.url
    // return data.url
  }
}

export default new StoreGoogle