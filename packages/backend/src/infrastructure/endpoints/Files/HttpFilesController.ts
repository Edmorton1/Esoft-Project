// import FileService from "../../services/FileService";
// import { fileTypeFromBuffer } from "file-type";
// import logger from "@app/server/helpers/logger";
// import HttpContext from "@app/server/infrastructure/express/Http.context";
// // import fileType from "file-type"

// class HttpFilesController {
//   TestConvertVideo = async (ctx: HttpContext) => {
//     // old: 1656511

//     // web: 470950 24.62s

//     // amd: 251880 1.94s
//     const buffer = ctx.file!.buffer!
//     const extention = (await fileTypeFromBuffer(buffer))!.ext
//     const total = await FileService.videoCompress(buffer, extention)
//     logger.info(total.length)
//     ctx.type('mp4')
//     ctx.send(buffer)
//   }

//   TestConvertAudio = async (ctx: HttpContext) => {
//     // old: 8014556

//     // wav: 17586712
//     // mp3: 3427330
//     // ogg: 2133090
//     const buffer = ctx.file!.buffer!
//     const extention = (await fileTypeFromBuffer(buffer))!.ext
//     logger.info(ctx.file, extention)
//     const total = await FileService.audioCompress(buffer, extention)
//     logger.info('разница:', buffer.length - total.length, buffer.length, total.length)
//     ctx.type('wav')
//     ctx.send(total)
//   }
// }

// export default new HttpFilesController