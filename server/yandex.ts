import EasyYandexS3 from 'easy-yandex-s3';
import dotenv from "dotenv"
import { YandexPost } from './core/domain/types';
import { randomUUID } from 'crypto';
dotenv.config()

export const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.YANDEX_ID!,
    secretAccessKey: process.env.YANDEX_SECRET!,
  },
  Bucket: process.env.BUCKET_NAME!,
  debug: false,
});

class Yandex {
  upload = async (buffer: Buffer, ext: string, path: string): Promise<YandexPost> => {

    const load = await s3.Upload(
      {
        buffer: buffer,
        name: `${randomUUID()}.${ext}`,
      },
      path
    );

    // console.log(load)
    //@ts-ignore
    return load
  }
  deleteFolder = async (id: number) => {
    //@ts-ignore
    const folder: string[] = ((await s3.GetList(`/messages/${id}/`)).Contents).map(e => e.Key)
    folder.forEach(async e => {
      await s3.Remove(e)
    })
    return folder
  }
  deleteArr = async (files: string[]): Promise<string[]> => {
    //@ts-ignore
    let folder: string[] = ((await s3.GetList(`/messages/${files[0].split('/')[1]}/`)).Contents).map(e => e.Key)
    console.log(folder, files)
    for (const e of folder) {
      if (files.includes(e)) {
        await s3.Remove(e);
        folder = folder.filter(item => item != e)
      }
    }
    console.log(folder)
  
    return folder.map(e => 'https://znakomstva.storage.yandexcloud.net/' + e);
  }
}

export default new Yandex



// export const getSignedUrl = async (fileKey: string): Promise<string> => {
//   const url = await s3.GetList
// }