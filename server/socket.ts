import { frSO } from "@shared/MAPPERS";
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
      const {data, type} = frSO(msg)
      switch (type) {
        case "userid":
          wsClient.id = data
          clients.set(data, wsClient)
          break
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