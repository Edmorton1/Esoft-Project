import { ORM } from "@s/infrastructure/db/ORM";

export class FormService {
  constructor (
    readonly ORM: ORM
  ) {}

  // async findTagInDB(tag: string): Promise<number | null> {

  // }

  async pushTag(userId: number, tag: string): Promise<void> {
    const tagId = await (await this.ORM.getByParams({tag: tag}, 'tags'))?.id
    
    if (tagId) {
      await this.ORM.post({id: userId, tagid: tagId}, 'user_tags')
    } else {
      const tagInDB = await this.ORM.post({tag}, 'tags')
      await this.ORM.post({id: userId, tagid: tagInDB.id}, 'user_tags')
    }
  }
}