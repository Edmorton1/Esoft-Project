import WebSocket from "ws";

function createWebSocketServer(server: any) {
  const ws = new WebSocket.Server({ server })

  ws.on('connection', (ws) => {
    console.log('WEB SOCKET WORK')

    ws.send('ПРИВЕТ С СЕРВЕРА')
    
    ws.on('message', msg => {
      console.log(msg)
    })
    ws.on('close', () => {
      console.log('КЛИЕНТ ЗАКРЫЛСЯ')
    })
  })
}

export default createWebSocketServer