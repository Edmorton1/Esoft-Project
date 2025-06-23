import dotenv from "dotenv"
import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
// import http from "http"
import cookieParser from "cookie-parser"
import { createWebSocketServer } from "@s/helpers/WebSocket/socket"
import "@s/infrastructure/redis/redis"
dotenv.config()
import https from "https"
import fs from 'fs'
import path from 'path'
import logger, { httpLogger } from "@s/helpers/logger"
import "@t/declarations/server/index"
import { COOKIE_NAME, PREFIX } from "@shared/CONST"
import session from "express-session"
import { redisStore } from "@s/infrastructure/redis/redis"
import publicRouter from "@s/routes/public"
import privateRouter from "@s/routes/private"
import adminRouter from "@s/routes/admin"

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

// РОУТЕР
app.use(session({
  store: redisStore,
  secret: process.env.SESSION_SECRET,
  name: COOKIE_NAME,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 600
  },
  // rolling: true
}))

app.use(httpLogger)

app.use(PREFIX, publicRouter)
app.use(PREFIX, privateRouter)
app.use(PREFIX, adminRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.info({ОШИБКА_500: err})
  res.status(500).json({ error: err })
})
// РОУТЕР

// ОТКЛЮЧЕНИЕ ВАРНИНГА У ЯНДЕКСА и require У FileType
process.removeAllListeners('warning');

server.listen(PORT, '0.0.0.0', () => logger.info(`СЕРВЕР ЗАПУЩЕН НА ПОРТУ: ${PORT},: ${process.env.URL_SERVER} КЛИЕНТ: ${process.env.URL_CLIENT}`))