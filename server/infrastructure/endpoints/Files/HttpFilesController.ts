import { Request, Response } from "express";
import ORM from "../../db/requests/ORM";
import FileService from "./services/FileService";
import { fileTypeFromBuffer } from "file-type";
import Yandex from "@s/yandex";
import logger from "@s/logger";
import { z } from "zod";
// import fileType from "file-type"

class HttpFilesController {
  postAvatar = async (req: Request, res: Response) => {
    
    const id = z.coerce.number().parse(req.params.id)
    const buffer = req.file!.buffer
    const compress = await FileService.imageCompress(buffer)

    logger.info(compress.length)
    // res.type("webp")
    // res.send(compress)
    const yandex = await Yandex.upload(compress,'.webp', '/avatars/')
    await ORM.put({avatar: yandex!.Location}, id, 'forms', 'avatar')
    res.json(yandex!.Location)
  }

  TestConvertVideo = async (req: Request, res: Response) => {
    // old: 1656511

    // web: 470950 24.62s

    // amd: 251880 1.94s
    const buffer = req.file!.buffer!
    const extention = (await fileTypeFromBuffer(buffer))!.ext
    const total = await FileService.videoCompress(buffer, extention)
    logger.info(total.length)
    res.type('mp4')
    res.send(buffer)
  }

  TestConvertAudio = async (req: Request, res: Response) => {
    // old: 8014556

    // wav: 17586712
    // mp3: 3427330
    // ogg: 2133090
    const buffer = req.file!.buffer!
    const extention = (await fileTypeFromBuffer(buffer))!.ext
    logger.info(req.file, extention)
    const total = await FileService.audioCompress(buffer, extention)
    logger.info('разница:', buffer.length - total.length, buffer.length, total.length)
    res.type('wav')
    res.send(total)
  }
}

export default new HttpFilesController