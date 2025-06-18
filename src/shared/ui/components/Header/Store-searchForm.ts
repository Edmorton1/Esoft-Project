import $api from "@/shared/api/api"
import { serverPaths } from "@shared/PATHS"
import { FormSchema } from "@t/gen/Users"
import { makeAutoObservable } from "mobx"
import { z } from "zod"

export const pickFieldsForm = {id: true, name: true, city: true, age: true, avatar: true, last_active: true} as const

const MicroCardSchema = FormSchema.pick(pickFieldsForm)

export type MicroCardType = z.infer<typeof MicroCardSchema>

class StoreSearchForm {
  finded: MicroCardType[] | null = null
  constructor() {
    makeAutoObservable(this)
  }

  searchForm = async (search: string) => {
    if (search.length < 2) return;

    const { data } = await $api.get(`${serverPaths.searchForm}/${search}`)
    const parsed = z.array(MicroCardSchema).parse(data)
    this.finded = parsed
    console.log(parsed)

    return parsed
  }
}

export default new StoreSearchForm