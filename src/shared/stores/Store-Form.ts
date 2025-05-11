import $api from "@/shared/api/api";
import { Form, Tags } from "@s/core/domain/Users";
import { FormDTO } from "@s/core/dtoObjects";
import { one, toCl } from "@shared/MAPPERS";
import { serverPaths } from "@shared/PATHS";
import { makeAutoObservable, runInAction } from "mobx";

class FormStore {
  form: Form | null | undefined = undefined

  constructor() {
    makeAutoObservable(this)
  }

  async initial(id: number) {
    const data = one(toCl<Form[]>(await $api.get(`/forms/${id}`)))
    runInAction(() => this.form = data)
  }

  async addTags(tags: Tags[]) {
    runInAction(() => this.form!.tags = tags)
  }

  async postForm(data: FormDTO) {
    const request = toCl<Form>(await $api.post(`${serverPaths.createForm}`, data))
    runInAction(() => this.form = request)
    // console.log(request)
  }

  async getById(id: number): Promise<Form> {
    const request = one(toCl<Form[]>(await $api.get(`/forms/${id}`)))
    return request
  }

  async getAll(): Promise<Form[]> {
    return toCl<Form[]>(await $api.get('/forms'))
  }
}

export default new FormStore