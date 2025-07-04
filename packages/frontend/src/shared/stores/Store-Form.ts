import $api from "@app/client/shared/api/api";
import { Form, FormSchema, Tags } from "@app/types/gen/Users";
import { one, toCl } from "@app/shared/MAPPERS";
import { serverPaths } from "@app/shared/PATHS";
import { makeAutoObservable, runInAction } from "mobx";
import StoreUser from "@app/client/shared/stores/Store-User";

class FormStore {
  form: Form | null | undefined = undefined

  constructor() {
    makeAutoObservable(this)
  }

  initial = async () => {
    console.log("FORM INITAL", StoreUser.user?.id)
    console.log("forms", this.form)
    if (!this.form) {
      const data = one(toCl<Form[]>(await $api.get(`${serverPaths.forms}/${StoreUser.user!.id}`)))
      const parsed = FormSchema.parse(data)
      runInAction(() => this.form = parsed)
    }
  }

  // addTags(tags: Tags[]) {
  //   this.form!.tags = tags
  // }

  // async postForm(data: RegistrationDTOClient) {
  //   const request = toCl<Form>(await $api.post(`${serverPaths.createForm}`, data))
  //   runInAction(() => this.form = request)
  //   // console.log(request)
  // }

  async getById(id: number): Promise<Form> {
    const request = one(toCl<Form[]>(await $api.get(`${serverPaths.forms}/${id}`)))
    return request
  }

  // async getAll(): Promise<Form[]> {
  //   return toCl<Form[]>(await $api.get(serverPaths.forms))
  // }

  setAvatar = (avatar: string) => {
    this.form!.avatar = avatar
  }

  setLastActive = (last_active: string) => {
    if (!this.form?.last_active) return;
    this.form.last_active = last_active
  }
}

export default new FormStore