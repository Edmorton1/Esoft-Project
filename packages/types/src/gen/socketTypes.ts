import { Form, Likes, Message } from "@app/types/gen/Users"

export type LikesSendSocketDTO = {
  like: Omit<Likes, "liked_userid">,
  form: Form
}
export type LikesDeleteSocketDTO = {userid: number, name: string}

export interface MsgTypesServer {
  userid: number,
  message: Message,
  delete_message: {toid: number, mesid: number},
  edit_message: Message,

  like: Likes
  delete_like: number
  rejectLike: number

  offer: {frForm: Form, toid: number, description: RTCSessionDescriptionInit},
  answer: {toForm: Form, frid: number, description: RTCSessionDescriptionInit},
  candidate: {isCaller: boolean, id: number, candidate: RTCIceCandidate},
  
  cancel: number
  last_active: null
}

export type OverdriveProperty<T, R> = Omit<T, keyof R> & R

export type MsgTypesClient = OverdriveProperty<MsgTypesServer, {
  answer: {toForm: Form, description: RTCSessionDescriptionInit},
  candidate: {isCaller: boolean, candidate: RTCIceCandidate},
  cancel: undefined,
  last_active: string,

  like: LikesSendSocketDTO
  delete_like: LikesDeleteSocketDTO,
}>

export type SocketMessageClientInterface = {
  [K in keyof MsgTypesClient]: {type: K, data: MsgTypesClient[K]}
}[keyof MsgTypesClient]

export type msg = keyof MsgTypesServer

export type SocketMessageServerInterface= {
  [K in keyof MsgTypesServer]: {type: K, data: MsgTypesServer[K]}
}[keyof MsgTypesServer]