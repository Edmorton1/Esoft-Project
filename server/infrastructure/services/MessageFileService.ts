import { ORM } from "@s/infrastructure/db/ORM";
import FileService from "./FileService";
import Yandex from "@s/yandex";
import { fileTypeFromBuffer } from "file-type";

export class MessageFileService {
  constructor(
    readonly FileService: FileService,
  ) {}

  async uploadFiles(id: number, files: Express.Multer.File[]): Promise<string[]> {
    const buffers = this.FileService.toBuffer(files)
    return await Promise.all(
      buffers.map(async (e, i) => {
        const [newBuffer, ext] = await this.FileService.compress(e)
        const load = await Yandex.upload(newBuffer, `${i}.${ext}` ,`/messages/${id}/`)
        console.log(load.Location)
      return load.Location
    }))
  }
}