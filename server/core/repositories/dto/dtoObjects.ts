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