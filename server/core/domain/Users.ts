export class User {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly password: string,
    readonly role: 'user' | 'admin',
    readonly created_at: Date,
  ) {}
}

export class Form {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly surname: string,
    readonly sex: boolean,
    readonly age: number,
    readonly avatar: string,
    readonly description: string,
    readonly target: string,
    readonly hood: string,
    readonly likes?: number[],
    readonly dataRes?: number[],
    readonly tags?: string[],
    readonly message?: Message[]
  ) {}
}

export class Message {
  constructor(
    readonly id: number,
    readonly fromId: number,
    readonly toId: number,
    readonly text: string,
    readonly created_at: Date
  ) {}
}

export class Likes {
  constructor(
    readonly id: number,
    readonly userId: number,
    readonly liked_userId: number,
  ) {}
}

export class Tags {
  constructor(
    readonly id: number,
    readonly tag: string,
  ) {}
}

export class DataRes {
  constructor(
    readonly id: number,
    readonly userId: number,
    readonly res_userId: number,
  ) {}
}

export class Token {
  constructor(
    readonly id: number,
    readonly token: string
  ) {}
}

export class UserTags {
  constructor(
    readonly id: number,
    readonly tagId: number
  ) {}
}