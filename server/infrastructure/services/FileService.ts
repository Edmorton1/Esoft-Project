import sharp from "sharp"
import ffmpeg from "fluent-ffmpeg"
import { Readable } from 'stream'

class FileService {
  async imageCompress(buffer: Buffer) {
    return await sharp(buffer)
    .resize(400)
    .webp({quality: 100})
    .toBuffer()
  }

  bufferToSream(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer)
    stream.push(null)
    return stream
  }

  async videoCompress(buffer: Buffer): Promise<Buffer> {
    return 
  }

  toBuffer(files: Express.Multer.File[]) {
    return files.map(e => e.buffer)
  }
}

export default FileService