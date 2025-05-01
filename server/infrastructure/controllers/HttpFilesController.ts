import { Request, Response } from "express";
import { ORM } from "../db/ORM";
import { upload } from "@s/yandex";
import sharp from "sharp";
import FileService from "../services/FileService";

class HttpFilesController {
  constructor(
    readonly FileService: FileService,
    readonly ORM: ORM
  ) {}

  async postAvatar(req: Request, res: Response) {
    
    const {id} = req.params
    const buffer = req.file!.buffer
    const compress = await this.FileService.imageCompress(buffer)

    console.log(compress.length)
    // res.type("webp")
    // res.send(compress)
    const yandex = await upload(compress, id + '.webp', '/avatars/')
    await this.ORM.put({avatar: yandex.Location}, id, 'forms')
    res.json(yandex.Location)
  }

  async TestConvertVideo(req: Request, res: Response) {
    // old: 1656511
    const buffer = req.file?.buffer!
    const total = await this.FileService.videoCompress(buffer)
    console.log(total.length)
    res.type('mp4')
    res.send(buffer)
  }
}

export default HttpFilesController