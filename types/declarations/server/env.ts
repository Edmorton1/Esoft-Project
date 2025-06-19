declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string,

    URL_SERVER: string,
    URL_SERVER_WS: string,
    
    URL_CLIENT: string,
    URL_CLIENT_WS: string,

    ACCESS_PRIVATE_KEY: string,
    REFRESH_PRIVATE_KEY: string,

    YANDEX_ID: string,
    YANDEX_SECRET: string,
    BUCKET_NAME: string,

    BUCKET_URL: string,

    SESSION_SECRET: string
  }
}
