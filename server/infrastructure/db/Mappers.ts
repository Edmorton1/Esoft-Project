import { msg, MsgTypes, SocketMessageInterface } from "@s/core/domain/types"

export function toTS(entity: any) {
    // return entity.rows.length > 1 ? entity.rows : entity.rows[0]
    return entity.rows
  }

export function toSQL(domainModel: any) {
  if (typeof domainModel == "string" || typeof domainModel == "object") {
    return `'${domainModel}'`
  } else if (typeof domainModel == "undefined") {
    return 'IS NULL'
  } 
  return domainModel
}

export const frJSON = <T>(data: string | any): T | null => {
  if (typeof data == "string") {
    return JSON.parse(data.toString())
  } return null
}

export function frSO(msg: any): SocketMessageInterface {
  return JSON.parse(msg.toString())
}

export const toJSON = (data: any): string => {
  return JSON.stringify(data)
}

export function toSO<T extends msg>(type: T, data: MsgTypes[T]) {
  return toJSON({data, type})
}

export const toCl = <T>(response: {data: T}): T => {
  // if (!data.data) {
  //   return null
  // }
  return response.data
}

export function one<T>(data: T[]): T {
  return data[0]
}