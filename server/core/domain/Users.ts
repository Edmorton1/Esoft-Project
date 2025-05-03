export class User {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly password: string,
    readonly role: 'user' | 'admin',
    readonly created_at: Date,
  ) {}
}

export type TargetType = 'friend' | 'relation' | 'chat' | 'hobby' | 'other'

export class Form {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly sex: boolean,
    readonly age: number,
    readonly target: TargetType,
    readonly targetCustom?: string,

    readonly avatar?: string | null,
    readonly description?: string,
    readonly city?: string,
    readonly location?: {lng: number, lat: number},
    public tags?: {id: number, tag: string}[],

    public likes?: number[],
    public dataRes?: number[],
    public message?: Message[]
  ) {}
}

export class Message {
  constructor(
    readonly id: number,
    readonly fromid: number,
    readonly toid: number,
    readonly text: string,
    readonly files: string[] | null,
    readonly created_at: Date
  ) {}
}

export class Likes {
  constructor(
    readonly id: number,
    readonly userid: number,
    readonly liked_userid: number,
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
    readonly userid: number,
    readonly res_userid: number,
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
    readonly tagid: number
  ) {}
}

// export class User {
//   constructor(
//     readonly id: number,
//     readonly email: string,
//     readonly password: string,
//     readonly role: 'user' | 'admin',
//     readonly created_at: Date,
//   ) {}
// }

// export class Form {
//   constructor(
//     readonly id: number,
//     readonly name: string,
//     readonly surname: string,
//     readonly sex: boolean,
//     readonly age: number,
//     readonly avatar: string,
//     readonly description: string,
//     readonly target: string,
//     readonly hood: string,
//     public likes?: number[],
//     public dataRes?: number[],
//     public tags?: string[],
//     public message?: Message[]
//   ) {}
// }

// export class Message {
//   constructor(
//     readonly id: number,
//     readonly fromId: number,
//     readonly toId: number,
//     readonly text: string,
//     readonly created_at: Date
//   ) {}
// }

// export class Likes {
//   constructor(
//     readonly id: number,
//     readonly userId: number,
//     readonly liked_userId: number,
//   ) {}
// }

// export class Tags {
//   constructor(
//     readonly id: number,
//     readonly tag: string,
//   ) {}
// }

// export class DataRes {
//   constructor(
//     readonly id: number,
//     readonly userId: number,
//     readonly res_userId: number,
//   ) {}
// }

// export class Token {
//   constructor(
//     readonly id: number,
//     readonly token: string
//   ) {}
// }

// export class UserTags {
//   constructor(
//     readonly id: number,
//     readonly tagId: number
//   ) {}
// }