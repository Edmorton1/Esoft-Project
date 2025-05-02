import dotenv from "dotenv"
import express from "express"
import router from "@s/router"
import cors from "cors"
import http from "http"
import cookieParser from "cookie-parser"
import { createWebSocketServer } from "@s/socket"
import "@s/infrastructure/cache/redis"
dotenv.config()

const app = express()

const PORT = process.env.PORT
const server = http.createServer(app)
createWebSocketServer(server)

app.use(cors({
  origin: ['http://localhost:5000'],
  credentials: true
}))

app.use(cookieParser())

app.use(express.json())

app.use('/', router)

// app.get('/', (req, res) => {
//   // Получаем IP из заголовков
//   const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//   console.log("User's IP:", ip);  // Выводим IP в консоль

//   res.send(`Your IP is: ${ip}`);
// });

// ОТКЛЮЧЕНИЕ ВАРНИНГА У ЯНДЕКСА и require У FileType
process.removeAllListeners('warning');

server.listen(PORT, () => console.log(`СЕРВЕР ЗАПУЩЕН НА ПОРТУ: ${PORT}, НА САЙТЕ: ${process.env.URL_SERVER}`))