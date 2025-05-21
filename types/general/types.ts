import { DataRes, Form, Likes, Message, Tags, Token, User, UserTags } from "@t/general/Users"

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

export interface MsgTypesServer {
  userid: number,
  message: Message,
  delete_message: number,
  edit_message: Message,

  like: Likes
  delete_like: number

  offer: {frid: number, toid: number, description: RTCSessionDescriptionInit},
  answer: {id: number, description: RTCSessionDescriptionInit},
  candidate: {isCaller: boolean, id: number, candidate: RTCIceCandidate}
}

export type OverdriveProperty<T, R> = Omit<T, keyof R> & R

export type MsgTypesClient = OverdriveProperty<MsgTypesServer, {
  answer: RTCSessionDescriptionInit,
  candidate: {isCaller: boolean, candidate: RTCIceCandidate},
}>

export type SocketMessageClientInterface = {
  [K in keyof MsgTypesClient]: {type: K, data: MsgTypesClient[K]}
}[keyof MsgTypesClient]

export type msg = keyof MsgTypesServer

export type SocketMessageServerInterface= {
  [K in keyof MsgTypesServer]: {type: K, data: MsgTypesServer[K]}
}[keyof MsgTypesServer]

export interface YandexPost {
  ETag: string,
  Location: string,
  key: string,
  Bucket: string
}
