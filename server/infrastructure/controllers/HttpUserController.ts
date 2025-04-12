import { UserRepositoryInterface } from "@s/core/repositories/UsersRepository";
import { UserService } from "@s/core/services/UserService";

export class HttpUserController {
  constructor(
    readonly UserService: UserService,
    readonly UserRepo: UserRepositoryInterface
  ) {}

}