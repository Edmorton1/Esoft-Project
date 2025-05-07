import $api from "@/shared/api/api"
import StoreForm from "@/shared/stores/Store-Form"
import StoreUser from "@/shared/stores/Store-User"
import { Form, Tags } from "@s/core/domain/Users"
import { one, toArr, toCl } from "@shared/MAPPERS"
import { serverPaths } from "@shared/PATHS"
import { makeAutoObservable, runInAction } from "mobx"

class StoreTags {
  tags: string[] | null = null

  constructor() {
    makeAutoObservable(this)
  }

  initial = async () => {
    const searchParams = toArr(new URLSearchParams(window.location.search).get('tags'))

    const request = StoreForm.form!.tags!
    console.log(request)
    StoreForm.addTags(request)

    const newTags = searchParams ? [...new Set([...request.map(e => e.tag), ...searchParams])] : request.map(e => e.tag)


    runInAction(() => this.tags = newTags)
  }

  addTags(tag: string) {
    this.tags?.push(tag)
  }
}

export default new StoreTags