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
    readonly likes: number[],
    readonly dataRes: number[],
    readonly tags: string[],
    readonly message: Message[]
  ) {}
}

export class Message {
  constructor(
    readonly msgId: number,
    readonly fromId: number,
    readonly toId: number,
    readonly text: string,
    readonly created_at: Date
  ) {}
}

export class Likes {
  constructor(
    readonly likeId: number,
    readonly userId: number,
    readonly liked_userId: number,
  ) {}
}

export class Tags {
  constructor(
    readonly tagId: number,
    readonly tag: string,
  ) {}
}

export class DataRes {
  constructor(
    readonly resId: number,
    readonly userId: number,
    readonly res_userId: number,
  ) {}
}

// export class User {
//   id: string;
//   email: string;
//   password: string;
//   role: 'user' | 'admin';
//   created_at: Date

//   constructor(
//     id: string,
//     email: string,
//     password: string,
//     role: 'user' | 'admin',
//     created_at: Date
//   ) {
//     this.id = id
//     this.email = email,
//     this.password = password,
//     this.role = role,
//     this.created_at = created_at
//   }
// }