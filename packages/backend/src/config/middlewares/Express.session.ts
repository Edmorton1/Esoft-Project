import { redisStore } from "@app/server/infrastructure/redis/redis";
import { COOKIE_NAME } from "@app/shared/CONST";
import session from "express-session";
import dotenv from "dotenv"
dotenv.config()

console.log("РЕДИС СТОР ДОТЕНВ КОНФИГ", process.env.SESSION_SECRET!)

const expressSession = session({
  store: redisStore,
  secret: process.env.SESSION_SECRET!,
  name: COOKIE_NAME,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 600
  },
  // rolling: true
})

export default expressSession