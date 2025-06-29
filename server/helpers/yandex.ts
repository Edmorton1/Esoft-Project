import EasyYandexS3 from 'easy-yandex-s3';
import dotenv from "dotenv"
import { randomUUID } from 'crypto';
import logger from '@s/helpers/logger';
import { Yandex_Folders } from '@t/gen/types';
dotenv.config()

export const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.YANDEX_ID,
    secretAccessKey: process.env.YANDEX_SECRET,
  },
  Bucket: process.env.BUCKET_NAME,
  debug: false,
});

class Yandex {
  getFolder = async (id: string | number, path: Yandex_Folders): Promise<string[]> => {
    const request = await s3.GetList(`/${path}/${id}/`)
    const requestVrap = request === false ? undefined : request

    const folder: string[] = requestVrap!.Contents!.map(e => e.Key!)
    return folder
  }

  upload = async (buffer: Buffer, ext: string, path: string) => {

    const load = await s3.Upload(
      {
        buffer: buffer,
        name: `${randomUUID()}.${ext}`,
      },
      path
    );
    return load === false ? undefined : Array.isArray(load) ? load[0] : load
  }

  deleteFolder = async (id: number, path: Yandex_Folders) => {
    const folder = await this.getFolder(id, path)
    folder.forEach(async e => {
      await s3.Remove(e)
    })
    return folder
  }

  deleteArr = async (id: number | string, files: string[], path: Yandex_Folders): Promise<string[]> => {
    let folder = await this.getFolder(id, path)
    files = files?.map(e => e.split('https://znakomstva.storage.yandexcloud.net/')[1])
    // logger.info('folder', folder)
    // logger.info([folder, files])
    for (const e of folder) {
      if (files?.includes(e)) {
        logger.info("!FILES", e, folder, files)
        await s3.Remove(e);
        folder = folder.filter(item => item != e)
      }
    }
    // logger.info(folder)

    return folder.map(e => process.env.BUCKET_URL + e);
  }
}

export default Yandex



// export const getSignedUrl = async (fileKey: string): Promise<string> => {
//   const url = await s3.GetList
// }