import $api from "@app/client/shared/api/api";
import { Form, FormSchema } from "@app/types/gen/Users";
import { serverPaths } from "@app/shared/PATHS";
import { makeAutoObservable, runInAction } from "mobx";
import StoreUser from "@app/client/shared/stores/Store-User";
import BroadCast from "@app/client/shared/stores/BroadCast";

class FormStore {
  form: Form | null | undefined = undefined
  channel: BroadCast<"setAvatar"> = new BroadCast("store-form")

  constructor() {
    makeAutoObservable(this)

    this.channel.register({
      setAvatar: (avatar: string) => {if (this.form) this.form.avatar = avatar}
    })
  }

  initial = async () => {
    console.log("FORM INITAL", StoreUser.user?.id)
    console.log("forms", this.form)
    if (!this.form) {
      const data = FormSchema.parse((await $api.get(`${serverPaths.forms}/${StoreUser.user!.id}`)).data[0])
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
    const request = FormSchema.parse((await $api.get(`${serverPaths.forms}/${id}`)).data[0])
    return request
  }

  // async getAll(): Promise<Form[]> {
  //   return toCl<Form[]>(await $api.get(serverPaths.forms))
  // }

  setAvatar = (avatar: string) => {
    this.form!.avatar = avatar
    this.channel.startFunction("setAvatar", [avatar])
  }

  setLastActive = (last_active: string) => {
    if (!this.form?.last_active) return;
    this.form.last_active = last_active
  }
}

export default new FormStore