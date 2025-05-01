import { ORM } from "@s/infrastructure/db/ORM";
import FileService from "./FileService";
import { upload } from "@s/yandex";

export class MessageFileService {
  constructor(
    readonly FileService: FileService,
  ) {}

  async uploadFiles(id: number, files: Express.Multer.File[]): Promise<string[]> {
    const buffers = this.FileService.toBuffer(files)
    return await Promise.all(
      buffers.map(async (e, i) => {
      const load = await upload(e, `${i}` ,`/messages/${id}/`)
      console.log(load.Location)
      return load.Location
    }))
  }

}