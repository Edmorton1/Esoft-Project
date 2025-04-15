import $api from "@/store/api";
import { Form } from "@s/core/domain/Users";
import { makeAutoObservable } from "mobx";

class FormStore {
  constructor() {
    makeAutoObservable(this)
  }

  async postForm(data: Form) {
    await $api.post('/createForm', data)
  }
}

export default new FormStore()