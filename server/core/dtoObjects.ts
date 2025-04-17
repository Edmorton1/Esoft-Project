import { User } from "@s/core/domain/Users";

export class UserDTO {
  constructor(
    readonly email: string,
    readonly password: string
  ) {}
}

export class PayloadDTO {
  constructor(
    readonly id: number,
    readonly role: string
  ) {}
}

export class JWTDTO {
  constructor(
    readonly id: number,
    readonly role: string,
    readonly iat: number,
    readonly exp: number
  ) {}
}

export class TokenDTO {
  constructor(
    readonly user: User,
    readonly accessToken: string
  ) {}
}
