import { nullToUndefiend, zid, zstring } from '@t/shared/zodSnippets';
import { z } from 'zod';

export const TargetTypeSchema = z.enum(['friend', 'relation', 'chat', 'hobby', 'other']);
export const UserRoleSchema = z.enum(['user', 'admin'])

export const LocationSchema = z.object({
    lng: z.number(),
    lat: z.number(),
  })

export const UserSchema = z.object({
  id: zid,
  email: zstring.email(),
  password: z.string().nonempty().min(6),
  role: UserRoleSchema,
  created_at: z.coerce.date(),
});

export const TagsSchema = z.object({
  id: zid,
  tag: zstring,
});

export const MessageSchema = z.object({
  id: zid,
  fromid: zid,
  toid: zid,
  text: zstring,
  files: z.array(z.string().nonempty()).optional(),
  created_at: z.coerce.date(),
});

export const LikesSchema = z.object({
  id: zid,
  userid: zid,
  liked_userid: zid,
});

// export const DataResSchema = z.object({
//   id: z.number(),
//   userid: z.number(),
//   res_userid: z.number(),
// });

export const TokenSchema = z.object({
  id: zid,
  token: z.string().nonempty(),
});


export const UserTagsSchema = z.object({
  id: zid,
  tagid: zid,
});


export const FormSchema = z.object({
  id: zid,
  name: zstring,
  sex: z.boolean(),
  age: z.number().positive().min(18).max(122),
  target: TargetTypeSchema,
  // targetCustom: z.string().optional(),
  avatar: z.preprocess(nullToUndefiend, z.string().nonempty().optional()).optional(),
  description: z.preprocess(nullToUndefiend, zstring.optional()).optional(),
  city: z.preprocess(nullToUndefiend, zstring.optional()).optional(),
  location: z.preprocess(nullToUndefiend, z.union([LocationSchema, z.string()]).optional()),
  tags: z.preprocess(nullToUndefiend, z.array(TagsSchema)),
  // likes: z.array(z.number()).optional(),
  // message: z.array(MessageSchema).optional(),
});

export type User = z.infer<typeof UserSchema>;
export type Form = z.infer<typeof FormSchema>;
export type UserTags = z.infer<typeof UserTagsSchema>;
export type Token = z.infer<typeof TokenSchema>;
// export type DataRes = z.infer<typeof DataResSchema>;
export type Likes = z.infer<typeof LikesSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Tags = z.infer<typeof TagsSchema>;
export type TargetType = z.infer<typeof TargetTypeSchema>;
export type UserRoleType = z.infer<typeof UserRoleSchema>;

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