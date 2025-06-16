import { FormDTO, LikesDTO, MessageDTO, TagsDTO, UserDTO, UserTagsDTO } from "@t/gen/dtoObjects"
import { Form, Likes, Message, Tags, Token, User, UserTags } from "@t/gen/Users"
import { UseFormRegister } from "react-hook-form"

export type Tables = {
  users: User,
  forms: Form,
  likes: Likes,
  messages: Message,
  // data_res: DataRes,
  tags: Tags,
  user_tags: UserTags,
  tokens: Token
}

export type TablesPost = {
  users: UserDTO,
  forms: FormDTO,
  likes: LikesDTO,
  messages: MessageDTO,
  tags: TagsDTO,
  user_tags: UserTagsDTO,
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

  offer: {frForm: Form, toid: number, description: RTCSessionDescriptionInit},
  answer: {toForm: Form, frid: number, description: RTCSessionDescriptionInit},
  candidate: {isCaller: boolean, id: number, candidate: RTCIceCandidate},
  
  cancel: number
}

export type OverdriveProperty<T, R> = Omit<T, keyof R> & R

export type MsgTypesClient = OverdriveProperty<MsgTypesServer, {
  answer: {toForm: Form, description: RTCSessionDescriptionInit},
  candidate: {isCaller: boolean, candidate: RTCIceCandidate},
  cancel: undefined
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

export interface FormWithDistanse extends Form {
  distance?: number
}

//@ts-ignore
//ПЕРЕНЕСТИ ПОТОМ 
export type lnglatType = [number, number]

export type RegisterNames<T> = T extends UseFormRegister<infer U> ? keyof U : never