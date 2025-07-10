import { TagsDTO } from "@app/types/gen/dtoObjects"
import { LocationType, Tags } from "@app/types/gen/Users";
import { Knex } from "knex";
import { inject, injectable } from "inversify";
import { ILogger } from "@app/server/infrastructure/helpers/logger/logger.controller";
import TYPES from "@app/server/config/containers/types";
import { DBType } from "@app/server/infrastructure/helpers/databases/postgres/config/db";
import ORM from "@app/server/infrastructure/helpers/databases/postgres/ORM";

@injectable()
class SharedService {
  constructor (
    @inject(TYPES.LoggerController)
    private readonly logger: ILogger,
    @inject(ORM)
    private readonly ORM: ORM,
    @inject(TYPES.DataBase)
    private readonly db: DBType
  ) {}
  uploadTags = async (id: number, tags?: TagsDTO[], removeOld: boolean = false): Promise<Tags[] | undefined> => {
    if (tags && tags.length > 0) {
      const tagsDB = await this.ORM.postArr(tags, "tags");
      this.logger.info(tagsDB)
      const tagDBParseToUser = tagsDB.map(e => ({id: id, tagid: e.id}));
      this.logger.info(tagDBParseToUser)
      // return (await ORM.postArr(tagDBParseToUser, "user_tags", true)).map(e => ({id: e.id, tag: tagsDB.find(tag => tag.id === e.tagid)!.tag}));
      await this.ORM.postArr(tagDBParseToUser, "user_tags", removeOld ? id : undefined);
      return tagsDB
    }
    return;
  }

  parseLocation = (location: LocationType): Knex.Raw<any> => {
    const {lng, lat} = location
    const pointWKT = `POINT(${lng} ${lat})`;
    const parsedKnex = this.db.raw(`ST_GeomFromText(?, 4326)`, [pointWKT])
    return parsedKnex
  }
}

export default SharedService