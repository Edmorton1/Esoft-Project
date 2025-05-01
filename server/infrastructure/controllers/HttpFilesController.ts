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

    // web: 470950 24.62s

    // amd: 251880 1.94s
    const buffer = req.file!.buffer!
    const extention = req.file!.originalname.split('.').pop()!
    const total = await this.FileService.videoCompress(buffer, extention)
    console.log(total.length)
    res.type('mp4')
    res.send(buffer)
  }

  async TestConvertAudio(req: Request, res: Response) {
    // old: 8014556

    // wav: 17586712
    // mp3: 3427330
    // ogg: 2133090
    const buffer = req.file!.buffer!
    const extention = req.file!.originalname.split('.').pop()!
    console.log(extention)
    const total = await this.FileService.audioCompress(buffer, extention)
    console.log('разница:', buffer.length - total.length, buffer.length, total.length)
    res.type('wav')
    res.send(total)
  }
}

export default HttpFilesController