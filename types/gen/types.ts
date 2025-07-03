import { FormDTO, LikesDTO, MessageDTO, PostsDTO, TagsDTO, UserDTO, UserTagsDTO } from "@t/gen/dtoObjects"
import { Form, Likes, Message, Posts, Tags, User, UserTags } from "@t/gen/Users"
import { UseFormRegister } from "react-hook-form"

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

export type TablesPost = {
  users: UserDTO,
  forms: FormDTO,
  likes: LikesDTO,
  messages: MessageDTO,
  tags: TagsDTO,
  user_tags: UserTagsDTO,
  posts: PostsDTO
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

export type RegisterNames<T> = T extends UseFormRegister<infer U> ? keyof U : never

export type Yandex_Folders = "messages" | "posts"