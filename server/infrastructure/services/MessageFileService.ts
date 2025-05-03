import FileService from "./FileService";
import Yandex from "@s/yandex";

export class MessageFileService {
  constructor(
    readonly FileService: FileService,
  ) {}

  //id - это id сообщения
  async uploadFiles(id: number, files: Express.Multer.File[]): Promise<string[]> {
    const buffers = this.FileService.toBuffer(files)
    return await Promise.all(
      buffers.map(async (e, i) => {
        const [newBuffer, ext] = await this.FileService.compress(e)
        const load = await Yandex.upload(newBuffer, ext ,`/messages/${id}/`)
        // console.log(load.Location)
      return load.Location
    }))
  }
}