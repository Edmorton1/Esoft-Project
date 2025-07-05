import { toJSON } from "@app/shared/MAPPERS"
import { msg, MsgTypesClient, MsgTypesServer, SocketMessageClientInterface, SocketMessageServerInterface } from "@app/types/gen/socketTypes"

export function frSOSe(msg: any): SocketMessageServerInterface {
  return JSON.parse(msg.toString())
}

export function frSOCl(msg: any): SocketMessageClientInterface {
    return JSON.parse(msg.toString())
}

export function toSOSe<T extends msg>(type: T, data: MsgTypesServer[T]) {
  return toJSON({data, type})
}

export function toSOCl<T extends msg>(type: T, data: MsgTypesClient[T]) {
  return toJSON({data, type})
}