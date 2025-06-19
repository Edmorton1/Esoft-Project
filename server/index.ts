import dotenv from "dotenv"
import express, { NextFunction, Request, Response } from "express"
import router from "@s/router"
import cors from "cors"
// import http from "http"
import cookieParser from "cookie-parser"
import { createWebSocketServer } from "@s/WebSocket/socket"
import "@s/infrastructure/redis/redis"
dotenv.config()
import https from "https"
import fs from 'fs'
import path from 'path'
import logger from "@s/logger"
import "@t/declarations/server/index"

const app = express()

const PORT = Number(process.env.PORT)

export const options = {
  cert: fs.readFileSync(path.resolve(__dirname, 'certs', '192.168.1.125.pem')),
  key: fs.readFileSync(path.resolve(__dirname, 'certs', '192.168.1.125-key.pem'))
}

const server = https.createServer(options, app)
createWebSocketServer(server)

app.use(cors({
  origin: ['https://localhost:5000', 'https://192.168.1.125:5000', 'http://localhost:5000', 'http://192.168.1.125:5000'],
  credentials: true
}))

app.use(cookieParser())

app.use(express.json())

app.use('/', router)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: err })
})

// app.get('/', (req, res) => {
//   // Получаем IP из заголовков
//   const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//   logger.info("User's IP:", ip);  // Выводим IP в консоль

//   res.send(`Your IP is: ${ip}`);
// });

// ОТКЛЮЧЕНИЕ ВАРНИНГА У ЯНДЕКСА и require У FileType
process.removeAllListeners('warning');

server.listen(PORT, '0.0.0.0', () => logger.info(`СЕРВЕР ЗАПУЩЕН НА ПОРТУ: ${PORT},: ${process.env.URL_SERVER} КЛИЕНТ: ${process.env.URL_CLIENT}`))