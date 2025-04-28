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
    const compress = await this.FileService.avatarCompress(buffer)

    console.log(compress.length)
    // res.type("webp")
    // res.send(compress)
    const yandex = await upload(compress, id + '.webp')
    await this.ORM.put({avatar: yandex.Location}, id, 'forms')
    res.json(yandex.Location)
  }
}

export default HttpFilesController