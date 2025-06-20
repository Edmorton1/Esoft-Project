import FileService from "@s/infrastructure/endpoints/Files/services/FileService";
import logger from "@s/helpers/logger";
import Yandex from "@s/helpers/yandex";

class UploadFileService {
	uploadAvatar = async (avatar: Express.Multer.File): Promise<string> => {
    const buffer = avatar.buffer
    const compress = await FileService.imageCompress(buffer)

    logger.info(compress.length)
    // res.type("webp")
    // res.send(compress)
    const yandex = await Yandex.upload(compress,'.webp', '/avatars/')
    logger.info('ЛОКАЦИЯ АВАТАРА', yandex!.Location)
    return yandex!.Location
	};
}

export default new UploadFileService;
