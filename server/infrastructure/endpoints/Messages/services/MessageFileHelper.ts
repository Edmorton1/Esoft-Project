import FileService from "@s/infrastructure/services/FileService";
import Yandex from "@s/helpers/yandex";

//@ts-ignore
// ВРЕМЕННАЯ ЗАГЛУШКА

class MessageFileHelper {
  uploadFiles = async (id: number | string, files: Express.Multer.File[]): Promise<string[]> => {
    const Yandexs = new Yandex()
    const buffers = FileService.toBuffer(files)
    return await Promise.all(
      buffers.map(async (e, i) => {
        const [newBuffer, ext] = await FileService.compress(e)
        const load = await Yandexs.upload(newBuffer, ext ,`/messages/${id}/`)
        // logger.info(load.Location)
      return load!.Location
    }))
  }
}

export default new MessageFileHelper