import $api from "@/shared/api/api";
import { Form, FormSchema, Tags } from "@t/gen/Users";
import { one, toCl } from "@shared/MAPPERS";
import { serverPaths } from "@shared/PATHS";
import { makeAutoObservable, runInAction } from "mobx";
import { RegistrationDTOClient } from "@/pages/Registration/widgets/RegistrationWidget/modules/types/RegistrationZOD";

class FormStore {
  form: Form | null | undefined = undefined

  constructor() {
    makeAutoObservable(this)
  }

  initial = async (id: number) => {
    console.log("forms", this.form)
    if (!this.form) {
      const data = one(toCl<Form[]>(await $api.get(`${serverPaths.forms}/${id}`)))
      const parsed = FormSchema.parse(data)
      runInAction(() => this.form = parsed)
    }
  }

  async addTags(tags: Tags[]) {
    runInAction(() => this.form!.tags = tags)
  }

  // async postForm(data: RegistrationDTOClient) {
  //   const request = toCl<Form>(await $api.post(`${serverPaths.createForm}`, data))
  //   runInAction(() => this.form = request)
  //   // console.log(request)
  // }

  async getById(id: number): Promise<Form> {
    const request = one(toCl<Form[]>(await $api.get(`${serverPaths.forms}/${id}`)))
    return request
  }

  async getAll(): Promise<Form[]> {
    return toCl<Form[]>(await $api.get(serverPaths.forms))
  }
}

export default new FormStore