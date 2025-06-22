import Yandex from "@s/helpers/yandex";
import ORMCopy from "@s/infrastructure/db/SQL/ORMCopy";
import { inject, injectable } from "inversify";

@injectable()
class SettingsService {
  constructor(
    @inject(Yandex)
    private readonly Yandex: Yandex,
    @inject(ORMCopy)
    private readonly ORM: ORMCopy
  ) {}

  postAvatar = async (id: number, compress: Buffer<ArrayBufferLike>) => {
    const yandex = await this.Yandex.upload(compress, ".webp", "/avatars/");
    await this.ORM.put({avatar: yandex!.Location}, id, "forms", "avatar");
    return yandex?.Location
  }
}

export default SettingsService