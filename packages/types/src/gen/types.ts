import { Form, Likes, Message, Posts, Tags, User, UserTags } from "@app/types/gen/Users"

export type Tables = {
  users: User,
  forms: Form,
  likes: Likes,
  messages: Message,
  // data_res: DataRes,
  tags: Tags,
  user_tags: UserTags,
  posts: Posts
  // tokens: Token
}

export type tables = keyof Tables

export interface YandexPost {
  ETag: string,
  Location: string,
  key: string,
  Bucket: string
}

export type lnglatType = [number, number]

export type Yandex_Folders = "messages" | "posts"

export const tablesArr: tables[] = [
  "users",
  "forms",
  "likes",
  "messages",
  "tags",
  "user_tags",
  "posts",
];