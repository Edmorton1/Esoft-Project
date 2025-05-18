export const PORT = '5000'
export const PORT_SERVER = '3000'

export const IP = '192.168.110.22'

// export const URL_SERVER = `http://localhost:${PORT_SERVER}`
// export const URL_SERVER_WS = `ws://localhost:${PORT_SERVER}`

// export const URL_CLIENT = `http://localhost:${PORT}`
// export const URL_CLIENT_WS = `ws://localhost:${PORT}`

const isLocalNetwork = false

export const URL_SERVER = `https://192.168.110.22:${PORT_SERVER}`
export const URL_SERVER_WS = isLocalNetwork 
  ? `ws://192.168.110.22:${PORT_SERVER}`
  : `wss://192.168.110.22:${PORT_SERVER}`

export const URL_CLIENT = `https://192.168.110.22:${PORT}`
export const URL_CLIENT_WS = isLocalNetwork 
  ? `ws://192.168.110.22:${PORT}`
  : `wss://192.168.110.22:${PORT_SERVER}`