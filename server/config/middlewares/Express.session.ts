import { redisStore } from "@s/infrastructure/redis/redis";
import { COOKIE_NAME } from "@shared/CONST";
import session from "express-session";

const expressSession = session({
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
})

export default expressSession