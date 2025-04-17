import { msg, MsgTypes, SocketMessageInterface } from "@s/core/domain/types"

export function toTS(entity: any) {
    return entity.rows.length > 1 ? entity.rows : entity.rows[0]
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

export const toCl = (data: any) => {
  return data.data
}

export function frSO<T extends msg>(type: T, data: MsgTypes[T]) {
  return JSON.stringify({data, type})
}