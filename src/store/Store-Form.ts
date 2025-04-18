import $api from "@/store/api";
import { Form } from "@s/core/domain/Users";
import { one, toCl } from "@s/infrastructure/db/Mappers";
import { makeAutoObservable } from "mobx";

class FormStore {
  form: Form = undefined

  constructor() {
    makeAutoObservable(this)
  }

  async postForm(data: Form) {
    const request: Form = toCl(await $api.post(`/createForm`, data))
    this.form = request
    // console.log(request)
  }

  async getForm(id: number) {
    const data: Form = one(toCl(await $api.get(`/forms/${id}`)))
    this.form = data
  }

  async getById(id: number): Promise<Form> {
    const request: Form = one(toCl(await $api.get(`/forms/${id}`)))
    // console.log(request)
    return request
  }
}

export default new FormStore()