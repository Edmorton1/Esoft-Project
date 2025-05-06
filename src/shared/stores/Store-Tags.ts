import $api from "@/shared/api/api"
import StoreUser from "@/shared/stores/Store-User"
import { Tags } from "@s/core/domain/Users"
import { toCl } from "@s/infrastructure/db/Mappers"
import { serverPaths } from "@shared/PATHS"
import { makeAutoObservable, runInAction } from "mobx"

class StoreTags {
  tags: Tags[] | null = null

  constructor() {
    makeAutoObservable(this)
  }

  initial = async () => {
    const request = toCl<Tags[]>(await $api.get(`${serverPaths.getUserTags}/${StoreUser.user?.id}`))
    // console.log("ИНИЦИАЛИЗАЦИЯ ТЭГОВ", request)
    runInAction(() => this.tags = request)
    // console.log(this.tags)
  }
}

export default new StoreTags