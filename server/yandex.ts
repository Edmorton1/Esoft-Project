import EasyYandexS3 from 'easy-yandex-s3';
import dotenv from "dotenv"
import { YandexPost } from './core/domain/types';
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
  upload = async (file: Buffer, name: number | string, path: string): Promise<YandexPost> => {

    const load = await s3.Upload(
      {
        buffer: file,
        name: String(name),
      },
      path
    );

    // console.log(load)
    //@ts-ignore
    return load
  }
  delete = async (id: number) => {
    //@ts-ignore
    const folder: string[] = ((await s3.GetList(`/messages/${id}/`)).Contents).map(e => e.Key)
    folder.forEach(async e => {
      await s3.Remove(e)
    })
    return folder
  }
}

export default new Yandex



// export const getSignedUrl = async (fileKey: string): Promise<string> => {
//   const url = await s3.GetList
// }