import { ReqPass, ReqProf } from "@s/infrastructure/endpoints/Helpers/middlewares/HelpersMiddlewares"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import ORM from "@s/infrastructure/db/SQL/ORM";
import logger from "@s/helpers/logger";
import { SALT } from "@shared/CONST";
import SharedService from "@s/infrastructure/services/SharedService";
import { one } from "@shared/MAPPERS";

class HttpHelpers {
  passwordCompare = async (req: Request, res: Response) => {
    const r = req as ReqPass;
    const id = req.session.userid!

    const bdPass = (await ORM.getById(id, 'users', 'password'))[0].password
    logger.info({bdPass})
    const rightPass = await bcrypt.compare(r.oldPass, bdPass)
    logger.info({password: rightPass})
    if (rightPass) {
      const passwordHash = await bcrypt.hash(r.newPass, SALT)
      await ORM.put({password: passwordHash}, id, 'users', 'password')
      return res.sendStatus(200)
    }
    res.sendStatus(400)
  }

  profilePut = async (req: Request, res: Response) => {
    const r = req as ReqProf
    const {tags, location, ...data} = r.profile
    const id = req.session.userid!

    logger.info({prof: r.profile})
    const newLocation = location && SharedService.parseLocation(location)

    //@ts-ignore
    const newProfile = one(await ORM.put(newLocation ? {...data, location: newLocation} : data, id, 'forms'))
    const newTags = await SharedService.uploadTags(id, tags, true)
    res.json({...newProfile, tags: newTags})
  }
}

export default new HttpHelpers