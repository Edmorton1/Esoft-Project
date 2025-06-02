import logger from "@s/logger";
import { frSOSe, toSOCl } from "@shared/MAPPERS";
import WebSocket from "ws";

interface WebSocketWidh extends WebSocket {
  id: number
}

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
      clients.delete(wsClient.id)
      logger.info('КЛИЕНТ ЗАКРЫЛСЯ')
    })
  })
}

export {createWebSocketServer, clients}