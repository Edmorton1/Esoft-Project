import EasyYandexS3 from 'easy-yandex-s3';
import { randomUUID } from 'crypto';
import { Yandex_Folders } from '@app/types/gen/types';
import type { S3 } from 'aws-sdk';
import { inject, injectable } from 'inversify';
import ConfigService from '@app/server/config/services/config.service';

// export const s3 = new EasyYandexS3({
//   auth: {
//     accessKeyId: process.env.YANDEX_ID,
//     secretAccessKey: process.env.YANDEX_SECRET,
//   },
//   Bucket: process.env.BUCKET_NAME,
//   debug: false,
// });

export interface IYandex {
  getFolder(id: string | number, path: Yandex_Folders): Promise<string[]>;
  upload(buffer: Buffer, ext: string, path: string): Promise<undefined | S3.ManagedUpload.SendData>;
  deleteFolder(id: number, path: Yandex_Folders): Promise<string[]>;
  deleteArr(id: number | string, files: string[], path: Yandex_Folders): Promise<string[]>;
}


@injectable()
class Yandex implements IYandex {
  s3: EasyYandexS3;
  constructor (
    @inject(ConfigService)
    private readonly configService: ConfigService
  ) {
    this.s3 = new EasyYandexS3({
      auth: {
        accessKeyId: this.configService.get("YANDEX_ID"),
        secretAccessKey: this.configService.get("YANDEX_SECRET"),
      },
      Bucket: this.configService.get("BUCKET_NAME"),
      debug: false,
    });
  }
  getFolder: IYandex['getFolder'] = async (id, path) => {
    const request = await this.s3.GetList(`/${path}/${id}/`)
    const requestVrap = request === false ? undefined : request

    const folder: string[] = requestVrap!.Contents!.map(e => e.Key!)
    return folder
  }

  upload: IYandex['upload'] = async (buffer, ext, path) => {

    const load = await this.s3.Upload(
      {
        buffer: buffer,
        name: `${randomUUID()}.${ext}`,
      },
      path
    );
    return load === false ? undefined : Array.isArray(load) ? load[0] : load
  }

  deleteFolder: IYandex['deleteFolder'] = async (id, path) => {
    const folder = await this.getFolder(id, path)
    folder.forEach(async e => {
      await this.s3.Remove(e)
    })
    return folder
  }

  deleteArr: IYandex['deleteArr'] = async (id, files, path) => {
    let folder = await this.getFolder(id, path)
    files = files?.map(e => e.split('https://znakomstva.storage.yandexcloud.net/')[1])
    // logger.info('folder', folder)
    // logger.info([folder, files])
    for (const e of folder) {
      if (files?.includes(e)) {
        // logger.info("!FILES", e, folder, files)
        await this.s3.Remove(e);
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