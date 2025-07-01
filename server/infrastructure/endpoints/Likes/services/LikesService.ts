import { toSOCl } from "@s/helpers/WebSocket/JSONParsers";
import { clientsType } from "@s/helpers/WebSocket/socket";
import ORM from "@s/infrastructure/db/SQL/ORM";
import LikesModule from "@s/infrastructure/endpoints/Likes/sql/Likes.module";
import TYPES from "@s/config/containers/types";
import { LikesDTO } from "@t/gen/dtoObjects";
import { lnglatType } from "@t/gen/types";
import { Form, FormSchema, Likes } from "@t/gen/Users";
import { inject, injectable } from "inversify";
import { z } from "zod";
import { ILogger } from "@s/helpers/logger/logger.controller";

interface LikesServiceRepo {
  sendLike: (likesDTO: LikesDTO) => Promise<Likes>;
  sendDelete: (id: number, userid: number) => Promise<Likes | null>;
	likesGet: (userid: number, lnglat?: lnglatType, cursor?: number) => Promise<Form[]>;
  rejectLike: (userid: number, liked_userid: number) => Promise<boolean>
}

@injectable()
class LikesService implements LikesServiceRepo {
	constructor(
		@inject(TYPES.LoggerController)
		private readonly logger: ILogger,
		@inject(ORM)
		private readonly ORM: ORM,
		@inject(TYPES.clients)
		private readonly clients: clientsType,
		@inject(LikesModule)
		private readonly likesModule: LikesModule,
	) {}

	sendLike: LikesServiceRepo["sendLike"] = async likesDTO => {
		const [data] = await this.ORM.post(likesDTO, "likes", "id, liked_userid");
		this.logger.info(this.clients.keys());
		const clientTo = this.clients.get(likesDTO.liked_userid);
		clientTo?.send(toSOCl("like", data));
		return data;
	};

	sendDelete: LikesServiceRepo["sendDelete"] = async (id, userid) => {
		const [data] = await this.ORM.delete(id, "likes", userid);

		if (!data) {
			return null;
		}

		const clientTo = this.clients.get(data.liked_userid);
		clientTo?.send(toSOCl("delete_like", data.id));
    return data
	};

	likesGet: LikesServiceRepo["likesGet"] = async (userid, lnglat?, cursor?) => {
		const [json_agg] = await this.likesModule.getLikedIds(userid)

		this.logger.info({ json_agg: json_agg });

		const request = await this.likesModule.getManyByParam(
			"id",
			json_agg.json_agg,
			lnglat,
			cursor,
		);
		return z.array(FormSchema).parse(request);
	};

  rejectLike: LikesServiceRepo['rejectLike'] = async (userid, liked_userid) => {
    this.logger.info({userid, liked_userid})
    const [offer] = await this.ORM.getByParams(
			{ userid: liked_userid, liked_userid: userid },
			"likes",
      "id"
		);

    this.logger.info({offer})

		if (!offer) {
			return false;
		}

		await this.ORM.delete(offer.id, "likes", liked_userid);
    return true;
  }
}

export default LikesService;
