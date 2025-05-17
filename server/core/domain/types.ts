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

export interface MsgTypesServer {
  userid: number,
  message: Message,
  delete_message: number,
  edit_message: Message,

  like: Likes
  delete_like: number

  offer: {id: number, description: RTCSessionDescriptionInit},
  answer: {id: number, description: RTCSessionDescriptionInit},
  candidate: {isCaller: boolean, id: number, candidate: RTCIceCandidate}
}

export type OverdriveProperty<T, R> = Omit<T, keyof R> & R

export type MsgTypesClient = OverdriveProperty<MsgTypesServer, {
  offer: RTCSessionDescriptionInit,
  answer: RTCSessionDescriptionInit,
  candidate: {isCaller: boolean, candidate: RTCIceCandidate},
}>

// export interface MsgTypesClient extends Omit<MsgTypesServer, 'offer' | 'answer' | 'candidate'> {
//   offer: RTCSessionDescriptionInit,
//   answer: RTCSessionDescriptionInit,
//   candidate: {isCaller: boolean, candidate: RTCIceCandidate}
// }

export type SocketMessageClientInterface = {
  [K in keyof MsgTypesClient]: {type: K, data: MsgTypesClient[K]}
}[keyof MsgTypesClient]

// interface Person {
//   name: string,
//   age: number
// }

// export interface Skuf extends Omit<Person, 'name'> {
//   name: number
// } 

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
