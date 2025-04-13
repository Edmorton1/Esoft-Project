import { DataRes, Form, Likes, Message, Tags, Token, User, UserTags } from "@s/core/domain/Users"

export type Tables = {
  users: User,
  form: Form,
  likes: Likes,
  message: Message,
  data_res: DataRes,
  tags: Tags,
  user_tags: UserTags,
  tokens: Token
}
// export type tables = 'users' | 'forms' | 'likes' | 'messages' | 'data_res' | 'tags' | 'user_tags' | 'tokens'
export type tables = keyof Tables