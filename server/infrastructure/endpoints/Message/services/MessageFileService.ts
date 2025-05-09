import FileService from "@s/infrastructure/endpoints/Files/services/FileService";
import Yandex from "@s/yandex";

class MessageFileService {
  async uploadFiles(id: number | string, files: Express.Multer.File[]): Promise<string[]> {
    const buffers = FileService.toBuffer(files)
    return await Promise.all(
      buffers.map(async (e, i) => {
        const [newBuffer, ext] = await FileService.compress(e)
        const load = await Yandex.upload(newBuffer, ext ,`/messages/${id}/`)
        // console.log(load.Location)
      return load.Location
    }))
  }
}

export default new MessageFileService