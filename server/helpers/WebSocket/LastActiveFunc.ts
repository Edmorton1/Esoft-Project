import ORM from "@s/infrastructure/db/SQL/ORM";
import logger from "@s/helpers/logger";
import { toSOCl } from "@s/helpers/WebSocket/JSONParsers";
import { WebSocketWidh } from "@s/helpers/WebSocket/socket";
import { TIMEZONE } from "@shared/CONST";

const activeTimers = new Map()

export async function TimePoint(wsClient: WebSocketWidh, id: number) {
  if (activeTimers.has(id)) return;

  const doIter = () => {
    const last_active =  new Date(Date.now() + TIMEZONE * 1000 * 60 * 60).toISOString()
    logger.info({LAST_POINT: last_active})
    ORM.put({last_active}, id, "forms")
    wsClient.send(toSOCl("last_active", last_active))
    logger.info({ОТПРАВКА_ЗАПРОСА_СО_СМЕНОЙ_ДАТЫ: last_active})
  }
  
  // const last_active =  new Date(Date.now() + TIMEZONE * 1000 * 60 * 60).toISOString()
  // logger.info({LAST_POINT: last_active})

  // ORM.put({last_active}, id, "forms")

  doIter()
  const interval = setInterval(() => doIter(), 50000)

  logger.info({SET_INTERVAL_ПОСТАВИЛ: 123})
  
  activeTimers.set(id, interval)
}

export function StopTimePoint(id: number) {
  const interval = activeTimers.get(id)
  if (interval) {
    clearInterval(interval)
    activeTimers.delete(id)
  }
}