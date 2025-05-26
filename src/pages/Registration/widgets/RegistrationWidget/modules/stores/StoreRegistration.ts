import $api from "@/shared/api/api"
import { toCl } from "@shared/MAPPERS"
import { serverPaths } from "@shared/PATHS"
import { User } from "@t/gen/Users"

class StoreRegistration {
  async emailIsFree(email: string) {
    const request = toCl<Pick<User, 'email'>[]>(await $api.get(`${serverPaths.users}?fields=email`)).map(e => e.email)
    return !request.includes(email)
  }
}

export default new StoreRegistration