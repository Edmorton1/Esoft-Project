import "express-session"
import "express";
import { SessionDataResolved } from "@app/server/config/express/Http.interfaces";

declare module "express-session" {
  interface SessionData extends SessionDataResolved {}
}

