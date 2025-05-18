import { TargetType, User } from "@s/core/domain/Users";

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
    readonly target: TargetType,
    // ПОТОМ СДЕЛАТЬ НЕОБЯЗ
    readonly targetCustom: string,
    readonly avatar?: FileList | string,
    public tags?: string | string[],

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

export class MessageDTO {
  constructor(
    readonly fromid: number| string,
    readonly toid: number | string,
    readonly text: string,
    public files: FileList,
  ) {}
}

export class MessagePutDTO {
  constructor(
    readonly id: number,
    readonly fromid: number,
    readonly toid: number,
    readonly text: string,
    readonly files: {new: FileList | null, old: string[] | null},
  ) {}
}

export class MessagePutServer {
  constructor(
    readonly fromid: number,
    readonly toid: number,
    readonly text: string,
    readonly deleted?: string[]
  ) {}
}