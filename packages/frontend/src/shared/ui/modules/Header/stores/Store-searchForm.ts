import $api from "@app/client/shared/api/api"
import { pickFieldsForm } from "@app/shared/CONST"
import { serverPaths } from "@app/shared/PATHS"
import { FormSchema } from "@app/types/gen/Users"
import { makeAutoObservable } from "mobx"
import { z } from "zod"

const MicroCardSchema = FormSchema.pick(pickFieldsForm)

export type MicroCardType = z.infer<typeof MicroCardSchema>

class StoreSearchForm {
  finded: MicroCardType[] = []
  hide: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  searchForm = async (search: string) => {
    if (search.length < 2) return this.finded = [];

    const { data } = await $api.get(`${serverPaths.searchForm}/${search}`)
    console.log("SEARCH DATA", data)
    const parsed = z.array(MicroCardSchema).parse(data)
    this.finded = parsed
    console.log(parsed)

    return parsed
  }

  enableHide = () => {
    this.hide = true
  }

  disableHide = () => {
    this.hide = false
  }
}

export default new StoreSearchForm