import { DataRes, Form, Likes, Message, Tags, Token, User, UserTags } from "@s/core/domain/Users"
import { FormDTO, MessageDTO, UserDTO } from "@s/core/dtoObjects"

export type Tables = {
  users: User,
  forms: Form,
  likes: Likes,
  messages: Message,
  data_res: DataRes,
  tags: Tags,
  user_tags: UserTags,
  tokens: Token
}

export type tables = keyof Tables

export type MsgTypes = {
  userid: number,
  message: Message,
  delete_message: number,
  edit_message: Message,

  like: Likes
  delete_like: number

  offer: string,
  answer: string,
  icecandidate: string
}

export type msg = keyof MsgTypes

export type SocketMessageInterface= {
  [K in keyof MsgTypes]: {type: K, data: MsgTypes[K]}
}[keyof MsgTypes]

export interface YandexPost {
  ETag: string,
  Location: string,
  key: string,
  Bucket: string
}
