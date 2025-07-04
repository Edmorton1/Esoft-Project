// import dotenv from "dotenv"
// import express from "express"
// import cors from "cors"
// import cookieParser from "cookie-parser"
// import { createWebSocketServer } from "@s/helpers/WebSocket/socket"
// import "@s/infrastructure/redis/redis"
// dotenv.config()
// import https from "https"
// import fs from 'fs'
// import path from 'path'
// import logger, { httpLogger } from "@s/helpers/logger/logger"
// import "@t/declarations/server/index"
// import { PREFIX } from "@shared/CONST"
// import publicRouter from "@s/OLD/public"
// import privateRouter from "@s/OLD/private"
// import adminRouter from "@s/OLD/admin"
// import expressSession from "@s/config/middlewares/Express.session"
// import expressError from "@s/config/middlewares/Express.error"
// // import helmet from "helmet";

// const app = express()

// const PORT = Number(process.env.PORT)

// export const options = {
//   cert: fs.readFileSync(path.resolve(__dirname, 'certs', '192.168.1.125.pem')),
//   key: fs.readFileSync(path.resolve(__dirname, 'certs', '192.168.1.125-key.pem'))
// }

// const server = https.createServer(options, app)
// createWebSocketServer(server)

// app.use(cors({
//   origin: ['https://localhost:5000', 'https://192.168.1.125:5000', 'http://localhost:5000', 'http://192.168.1.125:5000'],
//   credentials: true
// }))

// app.use(cookieParser())

// // app.use(helmet())

// app.use(express.json())

// // РОУТЕР
// app.use(expressSession)

// app.use(httpLogger)

// app.use(PREFIX, publicRouter)
// app.use(PREFIX, privateRouter)
// app.use(PREFIX, adminRouter)

// app.use(expressError)
// // РОУТЕР

// // ОТКЛЮЧЕНИЕ ВАРНИНГА У ЯНДЕКСА и require У FileType
// process.removeAllListeners('warning');

// server.listen(PORT, '0.0.0.0', () => logger.info(`СЕРВЕР ЗАПУЩЕН НА ПОРТУ: ${PORT},: ${process.env.URL_SERVER} КЛИЕНТ: ${process.env.URL_CLIENT}`))