import TYPES from "@app/server/config/containers/types";
import ConfigService from "@app/server/config/services/config.service";
import { ILogger } from "@app/server/infrastructure/helpers/logger/logger.controller";
import crypto from "crypto";
import { inject, injectable } from "inversify";

@injectable()
class CryptoService {
	constructor(
		@inject(TYPES.LoggerController)
		private readonly logger: ILogger,
		@inject(ConfigService)
		private readonly configService: ConfigService,
	) {}

	private IV_LENGTH = 16;

	encrypt = (data: any) => {
		const iv = crypto.randomBytes(this.IV_LENGTH);
		this.logger.info(iv);

		const key = Buffer.from(this.configService.get("COOKIE_SECRET"), "hex");
		const chipher = crypto.createCipheriv("aes-256-gcm", key, iv);

		this.logger.info(chipher);
		const jsonData = JSON.stringify(data);
		const encrypted = Buffer.concat([chipher.update(jsonData, "utf-8"), chipher.final()]);
		const tag = chipher.getAuthTag();

		return [iv.toString("base64"), encrypted.toString("base64"), tag.toString("base64")].join(":");
		// this.configService.get
	};

	decrypt = (encryptedData: string) => {
		const [ivB64, dataB64, tagB64] = encryptedData.split(":");
		const iv = Buffer.from(ivB64, "base64");
		const data = Buffer.from(dataB64, "base64");
		const tag = Buffer.from(tagB64, "base64");
		this.logger.info({ iv, data, tag });

		const key = Buffer.from(this.configService.get("COOKIE_SECRET"), "hex");

		const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
		this.logger.info(decipher);

		decipher.setAuthTag(tag);

		const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
		return JSON.parse(decrypted.toString("utf-8"));
	};
}

export default CryptoService;
