import dotenv from "dotenv"
import express from "express"
import router from "@s/router"
import cors from "cors"
import http from "http"
import createWebSocketServer from "@s/socket"
import cookieParser from "cookie-parser"
dotenv.config()

const app = express()

const PORT = process.env.PORT
const server = http.createServer(app)
const ws = createWebSocketServer(server)

app.use(cors({
  origin: ['http://localhost:5000'],
  credentials: true
}))

app.use(cookieParser())

app.use(express.json())

app.use('/', router)

server.listen(PORT, () => console.log(`СЕРВЕР ЗАПУЩЕН НА ПОРТУ: ${PORT}, НА САЙТЕ: ${process.env.URL_SERVER}`))

export { ws }