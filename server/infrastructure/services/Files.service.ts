import CompressService from "@s/infrastructure/services/Compress.service";
import logger from "@s/helpers/logger";
import { inject, injectable } from "inversify";
import Yandex from "@s/helpers/yandex";
import { Yandex_Folders } from "@t/gen/types";

@injectable()
class FilesService {
	constructor(
		@inject(Yandex)
		private readonly Yandex: Yandex,
	) {}
	uploadAvatar = async (avatar: Express.Multer.File): Promise<string> => {
		const buffer = avatar.buffer;
		const compress = await CompressService.imageCompress(buffer);

		// logger.info(compress.length);
		// res.type("webp")
		// res.send(compress)
		const yandex = await this.Yandex.upload(compress, ".webp", "/avatars/");
		logger.info("ЛОКАЦИЯ АВАТАРА", yandex!.Location);
		return yandex!.Location;
	};

	uploadFiles = async (id: number | string, files: Express.Multer.File[], path: Yandex_Folders): Promise<string[]> => {
		const buffers = CompressService.toBuffer(files);
		return await Promise.all(
			buffers.map(async (e, i) => {
				//@ts-ignore
				// ПОТОМ ДОБАВИТЬ СТРОГУЮ ПРОВЕРКУ НА EXT
				const [newBuffer, ext] = await CompressService.compress(e);
				const load = await this.Yandex.upload(
					newBuffer,
					ext,
					`/${path}/${id}/`,
				);
				// logger.info(load.Location)
				return load!.Location;
			}),
		);
	};
}

export default FilesService;
