import { Form } from "@s/core/domain/Users"
import { makeAutoObservable, runInAction } from "mobx"
import $api from "@/shared/api/api"
import { one, toCl } from "@shared/MAPPERS"
import { queryClient } from "@/shared/stores/ReactQuery"

class StoreProfile {
  profile: Form | null = null

  fetchProfile = async (id: number) => {
    const data = await queryClient.fetchQuery({
      queryKey: ['user', id],
      queryFn: async () => {
        const response = $api.get(`/forms/${id}`)
        return one(toCl(await response)) as Promise<Form>
      },
      staleTime: 1000 * 60 * 5,
    })
    runInAction(() => this.profile = data)
  }
  
  constructor() {
    makeAutoObservable(this)
  }

  initial = (data: Form) => {
    this.profile = data
  }

  async getProfile(id: number) {
    const request = one(toCl<Form[]>(await $api.get(`/forms/${id}`)))
    runInAction(() => this.profile = request)
  }
}

export default new StoreProfile