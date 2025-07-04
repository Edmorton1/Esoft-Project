import logger from "@s/helpers/logger/logger";
import { StopTimePoint, TimePoint } from "@s/helpers/WebSocket/LastActiveFunc";
import { frSOSe, toSOCl } from "@shared/JSONParsers";
import WebSocket from "ws";

export interface WebSocketWidh extends WebSocket {
  id: number
}

export type clientsType = Map<number, WebSocket>

const clients = new Map<number, WebSocket>()

function createWebSocketServer(server: any) {
  const wss = new WebSocket.Server({ server })

  wss.on('connection', (wsClient: WebSocketWidh) => {
    logger.info('WEB SOCKET WORK')
    // clients.set(-1, [wsClient])

    // ws.send('ПРИВЕТ С СЕРВЕРА')
    
    wsClient.on('message', msg => {
      const {data, type} = frSOSe(msg)
      switch (type) {
        case "userid":
          wsClient.id = data
          clients.set(data, wsClient)
          logger.info({ZASHOL: data})
          TimePoint(wsClient, data)
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
      }
        
    })
    wsClient.on('close', () => {
      StopTimePoint(wsClient.id)
      clients.delete(wsClient.id)
      logger.info('КЛИЕНТ ЗАКРЫЛСЯ')
    })
  })
}

export {createWebSocketServer, clients}