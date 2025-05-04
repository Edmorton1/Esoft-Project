import $api from "@/shared/api/api"
import StoreUser from "@/shared/stores/Store-User"
import { Tags } from "@s/core/domain/Users"
import { toCl } from "@s/infrastructure/db/Mappers"
import { serverPaths } from "@shared/PATHS"
import { runInAction } from "mobx"

class StoreTags {
  tags: Tags[] | null = null

  initial = async () => {
    const request = (toCl<Tags[]>(await $api.get(`${serverPaths.getUserTags}/${StoreUser.user?.id}`)))
    runInAction(() => this.tags = request)
    console.log(this.tags)
  }
}

export default new StoreTags