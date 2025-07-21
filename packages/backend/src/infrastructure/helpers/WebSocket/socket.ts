import appCont from "@app/server/config/containers/appCont.di";
import logger from "@app/server/infrastructure/helpers/logger/logger";
import LastActiveFuncs from "@app/server/infrastructure/helpers/WebSocket/LastActiveFunc";
import { frSOSe, toSOCl } from "@app/shared/JSONParsers";
import WebSocket from "ws";

export interface WebSocketWidh extends WebSocket {
  id: number
}

export type clientsType = Map<number, WebSocket>

const clients = new Map<number, WebSocket>()

function createWebSocketServer(server: any) {
  const wss = new WebSocket.Server({ server, path:"/socket" })

  wss.on('connection', (wsClient: WebSocketWidh) => {
    logger.info('WEB SOCKET WORK')
    const lastActiveFuncs = appCont.get(LastActiveFuncs)
    // clients.set(-1, [wsClient])

    // ws.send('ПРИВЕТ С СЕРВЕРА')
    
    wsClient.on('message', msg => {
      const {data, type} = frSOSe(msg)

      switch (type) {
        case "userid":
          wsClient.id = data
          clients.set(data, wsClient)
          logger.info({ZASHOL: data})
          lastActiveFuncs.TimePoint(wsClient, data)
          break
        
        case "offer":
          logger.info('clients', clients.keys())
          clients.get(data.toid)?.send(toSOCl("offer", data))
          break
        case "answer":
          logger.info("Ансвер получен")
          clients.get(data.frid)?.send(toSOCl('answer', {toForm: data.toForm, description: data.description}))
          break
        case "candidate":
          clients.get(data.id)?.send(toSOCl('candidate', {isCaller: data.isCaller, candidate: data.candidate}))
          break
        case "cancel":
          clients.get(data)?.send(toSOCl('cancel', undefined))
          break
        case "ping":
          logger.info({_____________WEB_SOCKET______________: "PING"})
          wsClient.send(toSOCl("ping", undefined))
      }
        
    })
    wsClient.on('close', () => {
      lastActiveFuncs.StopTimePoint(wsClient.id)
      clients.delete(wsClient.id)
      logger.info('КЛИЕНТ ЗАКРЫЛСЯ')
    })
  })
}

export {createWebSocketServer, clients}