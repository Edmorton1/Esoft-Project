import CompressService from "@s/infrastructure/services/Compress.service";
import { inject, injectable } from "inversify";
import Yandex from "@s/helpers/yandex";

interface MessagesServiceRepo {

}

@injectable()
class MessagesService implements MessagesServiceRepo {
  constructor (
    @inject(Yandex)
    private readonly Yandex: Yandex
  ) {}
  
}

export default MessagesService