import { frSOSe, toJSON, toSOCl, toSOSe } from "@shared/MAPPERS";
import WebSocket from "ws";

interface WebSocketWidh extends WebSocket {
  id: number
}

const clients = new Map<number, WebSocket>()

function createWebSocketServer(server: any) {
  const wss = new WebSocket.Server({ server })

  wss.on('connection', (wsClient: WebSocketWidh) => {
    console.log('WEB SOCKET WORK')
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
          console.log('clients', clients.keys())
          clients.get(data.id)?.send(toSOCl("offer", data.description))
          break
        case "answer":
          console.log("Ансвер получен")
          clients.get(data.id)?.send(toSOCl('answer', data.description))
      }
        
      // console.log(data)
    })
    wsClient.on('close', () => {
      clients.delete(wsClient.id)
      console.log('КЛИЕНТ ЗАКРЫЛСЯ')
    })
  })
}

export {createWebSocketServer, clients}