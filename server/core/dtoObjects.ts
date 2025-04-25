import { User } from "@s/core/domain/Users";

export class UserDTO {
  constructor(
    readonly email: string,
    readonly password: string
  ) {}
}

export class FormDTO {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly sex: boolean,
    readonly age: number,
    readonly target: string,
    // ПОТОМ СДЕЛАТЬ НЕОБЯЗ
    public tags: string,

    readonly surname?: string,
    readonly avatar?: string,
    readonly description?: string,
    readonly city?: string,
    readonly location?: {lng: number, lat: number},


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

export class LikesDTO {
  constructor(
    readonly userid: number,
    readonly liked_userid: number
  ) {}
}

export class LocationDTO {
  constructor(
    readonly city: string,
    readonly  lng: number,
    readonly lat: number
  ) {}
}