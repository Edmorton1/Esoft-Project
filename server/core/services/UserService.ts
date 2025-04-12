import { UserRepositoryInterface } from "@s/core/repositories/UsersRepository";

export class UserService {
  constructor(readonly UserRepo: UserRepositoryInterface) {}


}
