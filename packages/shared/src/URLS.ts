export const PORT = '5000'
export const PORT_SERVER = '3000'

// export const HOST = '192.168.1.125'
export const HOST = 'localhost'

export const URL_SERVER = `http://${HOST}:${PORT_SERVER}`
export const URL_SERVER_WS = `ws://${HOST}:${PORT_SERVER}`

export const URL_CLIENT = `http://${HOST}:${PORT}`
export const URL_CLIENT_WS = `ws://${HOST}:${PORT}`

// const isLocalNetwork = false

// export const URL_SERVER = `https://${HOST}:${PORT_SERVER}`

// export const URL_SERVER_WS = isLocalNetwork 
//   ? `ws://${HOST}:${PORT_SERVER}`
//   : `wss://${HOST}:${PORT_SERVER}`

// export const URL_CLIENT = `https://${HOST}:${PORT}`

// export const URL_CLIENT_WS = isLocalNetwork 
//   ? `ws://${HOST}:${PORT}`
//   : `wss://${HOST}:${PORT_SERVER}`