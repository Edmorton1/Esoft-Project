import { one } from "@shared/MAPPERS";
import ORM from "@s/infrastructure/db/requests/ORM";

class FormService {

  // async findTagInDB(tag: string): Promise<number | null> {

  // }

  async  pushTag(userId: number, tag: string): Promise<void> {
    const tagId = one(await (await ORM.getByParams({tag: tag}, 'tags')))?.id
    
    if (tagId) {
      await ORM.post({id: userId, tagid: tagId}, 'user_tags')
    } else {
      const tagInDB = one(await ORM.post({tag}, 'tags'))
      await ORM.post({id: userId, tagid: tagInDB.id}, 'user_tags')
    }
  }
}

export default new FormService