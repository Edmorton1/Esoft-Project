import { DataRes, Form, Likes, Message, Tags, Token, User, UserTags } from "@s/core/domain/Users"

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