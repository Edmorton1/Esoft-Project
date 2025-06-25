import db from "@s/infrastructure/db/db";
import logger from "@s/helpers/logger";
import { TagsDTO } from "@t/gen/dtoObjects"
import { LocationType, Tags } from "@t/gen/Users";
import { Knex } from "knex";
import { inject, injectable } from "inversify";
import ORMCopy from "@s/infrastructure/db/SQL/ORMCopy";

@injectable()
class SharedService {
  constructor (
    @inject(ORMCopy)
    private readonly ORM: ORMCopy
  ) {}
  uploadTags = async (id: number, tags?: TagsDTO[], removeOld: boolean = false): Promise<Tags[] | undefined> => {
    if (tags && tags.length > 0) {
      const tagsDB = await this.ORM.postArr(tags, "tags");
      logger.info(tagsDB)
      const tagDBParseToUser = tagsDB.map(e => ({id: id, tagid: e.id}));
      logger.info(tagDBParseToUser)
      // return (await ORM.postArr(tagDBParseToUser, "user_tags", true)).map(e => ({id: e.id, tag: tagsDB.find(tag => tag.id === e.tagid)!.tag}));
      await this.ORM.postArr(tagDBParseToUser, "user_tags", removeOld ? id : undefined);
      return tagsDB
    }
    return;
  }

  parseLocation = (location: LocationType): Knex.Raw<any> => {
    const {lng, lat} = location
    const pointWKT = `POINT(${lng} ${lat})`;
    const parsedKnex = db.raw(`ST_GeomFromText(?, 4326)`, [pointWKT])
    return parsedKnex
  }
}

export default SharedService