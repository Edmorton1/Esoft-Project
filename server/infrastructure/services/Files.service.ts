import CompressService from "@s/infrastructure/services/Compress.service";
import { inject, injectable } from "inversify";
import Yandex from "@s/helpers/yandex";
import { Yandex_Folders } from "@t/gen/types";
import { ILogger } from "@s/helpers/logger/logger.controller";
import TYPES from "@s/config/containers/types";

export interface IFilesService {
  uploadAvatar(avatar: Express.Multer.File): Promise<string>;
  uploadFiles(id: number | string, files: Express.Multer.File[], path: Yandex_Folders): Promise<string[]>;
}

@injectable()
class FilesService implements IFilesService {
	constructor(
		@inject(TYPES.LoggerController)
		private readonly logger: ILogger,
		@inject(Yandex)
		private readonly Yandex: Yandex,
	) {}
	uploadAvatar: IFilesService['uploadAvatar'] = async (avatar) => {
		const buffer = avatar.buffer;
		const compress = await CompressService.imageCompress(buffer);

		// logger.info(compress.length);
		// res.type("webp")
		// res.send(compress)
		const yandex = await this.Yandex.upload(compress, ".webp", "/avatars/");
		this.logger.info("ЛОКАЦИЯ АВАТАРА", yandex!.Location);
		return yandex!.Location;
	};

	uploadFiles: IFilesService['uploadFiles'] = async (id, files, path) => {
		const buffers = CompressService.toBuffer(files);
		return await Promise.all(
			buffers.map(async (e, i) => {
				// FIXME: ДОБАВИТЬ СТРОГУЮ ПРОВЕРКУ НА РАЗРЕШЕНИЕ
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
