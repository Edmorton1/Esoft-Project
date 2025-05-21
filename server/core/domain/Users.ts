import { z } from 'zod';

export const TargetTypeSchema = z.enum(['friend', 'relation', 'chat', 'hobby', 'other']);

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['user', 'admin']),
  created_at: z.coerce.date(),
});

export const TagsSchema = z.object({
  id: z.number(),
  tag: z.string(),
});

export const MessageSchema = z.object({
  id: z.number(),
  fromid: z.number(),
  toid: z.number(),
  text: z.string(),
  files: z.array(z.string()).nullable(),
  created_at: z.coerce.date(),
});

export const LikesSchema = z.object({
  id: z.number(),
  userid: z.number(),
  liked_userid: z.number(),
});

export const DataResSchema = z.object({
  id: z.number(),
  userid: z.number(),
  res_userid: z.number(),
});

export const TokenSchema = z.object({
  id: z.number(),
  token: z.string(),
});


export const UserTagsSchema = z.object({
  id: z.number(),
  tagid: z.number(),
});


export const FormSchema = z.object({
  id: z.number(),
  name: z.string(),
  sex: z.boolean(),
  age: z.number(),
  target: TargetTypeSchema,
  // targetCustom: z.string().optional(),
  avatar: z.string().optional(),
  description: z.string().optional(),
  city: z.string().optional(),
  location: z.object({
    lng: z.number(),
    lat: z.number(),
  }).optional(),
  tags: z.array(TagsSchema).optional(),
  // likes: z.array(z.number()).optional(),
  // message: z.array(MessageSchema).optional(),
});

export type User = z.infer<typeof UserSchema>;
export type Form = z.infer<typeof FormSchema>;
export type UserTags = z.infer<typeof UserTagsSchema>;
export type Token = z.infer<typeof TokenSchema>;
export type DataRes = z.infer<typeof DataResSchema>;
export type Likes = z.infer<typeof LikesSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Tags = z.infer<typeof TagsSchema>;
export type TargetType = z.infer<typeof TargetTypeSchema>;

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