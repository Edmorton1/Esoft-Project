import sharp from "sharp"
import ffmpeg from "fluent-ffmpeg"
import ffmpegPath from "ffmpeg-static"
import { promisify } from "util";
import path from "path";
import { tmpdir } from "os";
import { promises, unlink, writeFile } from "fs";
import { PassThrough, Readable } from "stream";
import { randomUUID } from "crypto";
import { fileTypeFromBuffer } from "file-type";

ffmpeg.setFfmpegPath(ffmpegPath!);

const writeFileFS = promisify(writeFile);
const unlinkFS = promisify(unlink);

class FileService {
  toBuffer(files: Express.Multer.File[]) {
    return files.map(e => e.buffer)
  }
  
  async imageCompress(buffer: Buffer) {
    return await sharp(buffer)
    .resize(400)
    .webp({quality: 100})
    .toBuffer()
  }
  
  async videoCompress(buffer: Buffer, extention: string): Promise<Buffer> {
    const input = path.join(tmpdir(), `input-${randomUUID()}.${extention}`);
    const output = path.join(tmpdir(), `output-${randomUUID()}.mp4`);
  
    await writeFileFS(input, buffer);

    await promises.stat(input); 
  
    return new Promise((resolve, reject) => {
      ffmpeg(input)
        .size('1280x720')
        .outputOptions([
          '-c:v h264_amf',
          '-b:v 800k',
          '-maxrate 1200k',
          '-bufsize 1000k',
          '-preset fast',
          '-c:a aac',
          '-b:a 64k',
          '-movflags +faststart',
          '-f mp4'
        ])
        .outputFormat('mp4')
        // .on('stderr', line => console.log('[ffmpeg]', line))
        .on('end', async () => {
          try {
            const outputBuffer = await promises.readFile(output);
            resolve(outputBuffer);
          } catch (err) {
            reject(err);
          } finally {
            await unlinkFS(input);
            await unlinkFS(output);
          }
        })
        .on('error', async (err) => {
          await unlinkFS(input).catch(() => {});
          await unlinkFS(output).catch(() => {});
          reject(err);
        })
        .save(output);
    });
  }

  async audioCompress(buffer: Buffer, extention: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const outputStream = new PassThrough();
  
      ffmpeg()
        .input(Readable.from(buffer))
        .inputFormat(extention)
        .audioCodec('libvorbis')
        .audioBitrate(96)
        .toFormat('ogg')
        .on('error', (err) => {
          console.error(err);
          reject(err);
        })
        .pipe(outputStream, { end: true });
  
      const chunks: Buffer[] = [];
  
      outputStream.on('data', (chunk) => {
        chunks.push(chunk);
      });
  
      outputStream.on('end', () => {
        const resultBuffer = Buffer.concat(chunks);
        resolve(resultBuffer);
      });
    });
  }

  async compress(buffer: Buffer): Promise<[Buffer, string]> {
    const type = (await fileTypeFromBuffer(buffer))
    const ext = type!.ext
    const mime = type!.mime
    console.log(ext, mime)

    if (mime.includes('image')) {
      return [await this.imageCompress(buffer), 'webp']
    }
    else if (mime.includes('audio')) {
      console.log('AUDIO MIME INCLUDE TRUE')
      return [await this.audioCompress(buffer, ext), 'ogg']
    }
    else if (mime.includes('video')) {
      return [await this.videoCompress(buffer, ext), 'mp4']
    }
    throw new Error('Неизвестное разрешение')
  }
}

export default new FileService