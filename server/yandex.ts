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

export const upload = async (file: Buffer, name: string): Promise<YandexPost> => {
  const load = await s3.Upload(
    {
      buffer: file,
      name: name,
    },
    '/avatars/'
  );
  console.log(load)
  //@ts-ignore
  return load
}

// export const getSignedUrl = async (fileKey: string): Promise<string> => {
//   const url = await s3.GetList
// }