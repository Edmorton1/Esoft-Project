import { redisStore } from "@app/server/infrastructure/redis/redis";
import { COOKIE_NAME } from "@app/shared/CONST";
import session from "express-session";

console.log("REDIST DOTENV CONFIG", process.env.SESSION_SECRET!)

const expressSession = session({
  store: redisStore,
  secret: process.env.SESSION_SECRET!,
  name: COOKIE_NAME,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    maxAge: 1000 * 60 * 60 * 600,
    httpOnly: true,
    sameSite: "none"
  },
  // rolling: true
})

export default expressSession