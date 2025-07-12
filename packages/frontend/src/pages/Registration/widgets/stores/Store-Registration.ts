import $api from "@app/client/shared/api/api";
import StoreAlert from "@app/client/shared/ui/Toast/Store-Alert";
import { serverPaths } from "@app/shared/PATHS";
import { LocationDTO } from "@app/types/gen/dtoObjects";
import { makeAutoObservable } from "mobx";
import SharedRequests from "@app/client/shared/funcs/Shared-Requests";
import { gmailName, GoogleDataSchemaWithoutGoogl_id } from "@app/types/gen/Schemas";

class StoreRegistration {
	defaultCoords: null | LocationDTO = null;
	coords: null | LocationDTO = null;
	cookie: gmailName | null = null

	constructor() {
		makeAutoObservable(this);
	}

	// googleCookie = async (): Promise<Partial<Form>> => {
	googleCookie = async () => {
		const {data} = await $api.get(serverPaths.validateGoogleCookie)
		const parsed = GoogleDataSchemaWithoutGoogl_id.safeParse(data.googleCookie)
		
		console.log("КУКА ИЗ ЗАПРОСА", data, parsed)

		if (parsed.success) {
			return this.cookie = parsed.data
		}
		return this.cookie = null
	}

	setDefaultCoords = (coords: LocationDTO) => {
		this.defaultCoords = coords;
	};

	setCoords = async (coords: number[]) => {
		const location = await SharedRequests.cityByCoords(coords);
		this.coords = location;
		if (location.city === "") {
			StoreAlert.mapError("Нельзя поставить координаты здесь", "error.main");
		}
	};

	async emailIsFree(email: string) {
		const { data } = await $api.get(`${serverPaths.checkEmail}/${email}`);
		return data;
	}
}

export default new StoreRegistration();
