declare namespace NodeJS {
    interface ProcessEnv {
      PORT: string,

      URL_SERVER: string,
      URL_SERVER_WS: string,
      
      URL_CLIENT: string,
      URL_CLIENT_WS: string
    }
  }