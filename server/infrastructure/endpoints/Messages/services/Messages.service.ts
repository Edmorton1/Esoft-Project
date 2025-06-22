import FileService from "@s/infrastructure/services/FileService";
import { inject, injectable } from "inversify";
import Yandex from "@s/helpers/yandex";

interface MessagesServiceRepo {
  uploadFiles: (id: number | string, files: Express.Multer.File[]) => Promise<string[]>
}

@injectable()
class MessagesService implements MessagesServiceRepo {
  constructor (
    @inject(Yandex)
    private readonly Yandex: Yandex
  ) {}
  uploadFiles: MessagesServiceRepo['uploadFiles'] = async (id, files) => {
    const buffers = FileService.toBuffer(files)
    return await Promise.all(
      buffers.map(async (e, i) => {
        const [newBuffer, ext] = await FileService.compress(e)
        const load = await this.Yandex.upload(newBuffer, ext ,`/messages/${id}/`)
        // logger.info(load.Location)
      return load!.Location
    }))
  }
}

export default MessagesService