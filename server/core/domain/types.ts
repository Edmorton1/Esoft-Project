import { DataRes, Form, Likes, Message, Tags, User } from "@s/core/domain/Users"

export type Tables = User | Form | Likes | Message | DataRes | Tags
export type tables = 'users' | 'forms' | 'likes' | 'messages' | 'data_res' | 'tags' | 'user_tags'