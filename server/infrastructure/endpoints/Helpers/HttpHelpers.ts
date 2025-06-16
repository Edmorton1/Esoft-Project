import { ReqPass } from "@s/infrastructure/endpoints/Helpers/middlewares/HelpersMiddlewares"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import ORM from "@s/infrastructure/db/requests/ORM";
import logger from "@s/logger";
import { SALT } from "@shared/CONST";

class HttpHelpers {
  passwordCompare = async (req: Request, res: Response) => {
    const r = req as ReqPass;

    const bdPass = (await ORM.getById(r.id, 'users', 'password'))[0].password
    logger.info({bdPass})
    const rightPass = await bcrypt.compare(r.oldPass, bdPass)
    logger.info({password: rightPass})
    if (rightPass) {
      const passwordHash = await bcrypt.hash(r.newPass, SALT)
      await ORM.put({password: passwordHash}, r.id, 'users', 'password')
      return res.sendStatus(200)
    }
    res.sendStatus(400)
  }
}

export default new HttpHelpers