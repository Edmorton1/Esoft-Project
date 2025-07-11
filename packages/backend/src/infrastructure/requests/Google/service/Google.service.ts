// import { googleQueryType } from "@app/server/infrastructure/requests/Google/validation/Google.validation"
import ORM from "@app/server/infrastructure/helpers/databases/postgres/ORM";
import { inject, injectable } from "inversify";

interface IGoogleService {
	is_authorize: (data: string, google_id: string) => Promise<null | number>;
}

@injectable()
class GoogleService implements IGoogleService {
	constructor(
		@inject(ORM)
		private readonly ORM: ORM,
	) {}
	is_authorize: IGoogleService["is_authorize"] = async (email, google_id) => {
		const [data] = await this.ORM.getByParams({ email }, "users", "id, email, google_id");
    if (data) {
      const id = data.id
      const db_google_id = data.google_id
      if (db_google_id === google_id) {
        return id
      } else if (id && db_google_id !== google_id) {
        throw new Error("Не совпадает google_id")
      }
    }
		return null;
	};
}

export default GoogleService;
