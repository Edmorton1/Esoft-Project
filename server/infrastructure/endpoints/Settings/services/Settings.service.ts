import Yandex from "@s/helpers/yandex";
import ORMCopy from "@s/infrastructure/db/SQL/ORMCopy";
import { inject, injectable } from "inversify";

interface SettingsServiceRepo {
  postAvatar: (id: number, compress: Buffer<ArrayBufferLike>) => Promise<string | undefined>
}

@injectable()
class SettingsService implements SettingsServiceRepo {
  constructor(
    @inject(Yandex)
    private readonly Yandex: Yandex,
    @inject(ORMCopy)
    private readonly ORM: ORMCopy
  ) {}

  postAvatar: SettingsServiceRepo['postAvatar'] = async (id, compress) => {
    const yandex = await this.Yandex.upload(compress, ".webp", "/avatars/");
    await this.ORM.put({avatar: yandex!.Location}, id, "forms", "avatar");
    return yandex?.Location
  }
}

export default SettingsService