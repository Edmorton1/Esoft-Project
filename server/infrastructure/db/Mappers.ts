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

export function toSO(msg: any): SocketMessageInterface {
  return JSON.parse(msg.toString())
}

export const toCl = <T>(response: {data: T}): T => {
  // if (!data.data) {
  //   return null
  // }
  return response.data
}

export function frSO<T extends msg>(type: T, data: MsgTypes[T]) {
  return JSON.stringify({data, type})
}

export function one<T>(data: T[]): T {
  return data[0]
}