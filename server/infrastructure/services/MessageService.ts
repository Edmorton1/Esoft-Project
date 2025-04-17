import { ORM } from "@s/infrastructure/db/ORM";

export class MessageService {
  constructor(
    readonly ORM: ORM
  ) {}

}