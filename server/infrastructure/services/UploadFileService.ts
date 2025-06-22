import FileService from "@s/infrastructure/services/FileService";
import logger from "@s/helpers/logger";
import { inject, injectable } from "inversify";
import Yandex from "@s/helpers/yandex";

@injectable()
class UploadFileService {
	constructor(
    @inject(Yandex)
    private readonly Yandex: Yandex
  ) {}
	uploadAvatar = async (avatar: Express.Multer.File): Promise<string> => {
		const buffer = avatar.buffer;
		const compress = await FileService.imageCompress(buffer);

		logger.info(compress.length);
		// res.type("webp")
		// res.send(compress)
		const yandex = await this.Yandex.upload(compress, ".webp", "/avatars/");
		logger.info("ЛОКАЦИЯ АВАТАРА", yandex!.Location);
		return yandex!.Location;
	};
}

export default UploadFileService;
