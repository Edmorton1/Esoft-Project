import sharp from "sharp"

class FileService {
  async avatarCompress(buffer: Buffer) {
    return await sharp(buffer)
    .resize(400)
    .webp({quality: 100})
    .toBuffer()
  }
}

export default FileService