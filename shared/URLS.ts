export const PORT = '5000'
export const PORT_SERVER = '3000'

export const IP = '192.168.1.125'

// export const URL_SERVER = `http://localhost:${PORT_SERVER}`
// export const URL_SERVER_WS = `ws://localhost:${PORT_SERVER}`

// export const URL_CLIENT = `http://localhost:${PORT}`
// export const URL_CLIENT_WS = `ws://localhost:${PORT}`

const isLocalNetwork = false

export const URL_SERVER = `https://${IP}:${PORT_SERVER}`
export const URL_SERVER_WS = isLocalNetwork 
  ? `ws://${IP}:${PORT_SERVER}`
  : `wss://${IP}:${PORT_SERVER}`

export const URL_CLIENT = `https://${IP}:${PORT}`
export const URL_CLIENT_WS = isLocalNetwork 
  ? `ws://${IP}:${PORT}`
  : `wss://${IP}:${PORT_SERVER}`