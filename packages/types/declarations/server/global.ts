import "express-session"
import "express";
import { UserRoleType } from "@app/types/gen/Users";

declare module "express-session" {
  interface SessionData {
    userid: number,
    role: UserRoleType
  }
}
