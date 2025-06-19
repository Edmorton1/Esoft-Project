import $api from "@/shared/api/api"
import { pickFieldsForm } from "@shared/CONST"
import { serverPaths } from "@shared/PATHS"
import { FormSchema } from "@t/gen/Users"
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