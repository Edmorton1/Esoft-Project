import $api from "@/shared/api/api";
import {parseWkbPoint, toCl} from "@shared/MAPPERS";
import {serverPaths} from "@shared/PATHS";
import {Form} from "@t/gen/Users";
import {makeAutoObservable} from "mobx";

class StoreMap {
	constructor() {
		makeAutoObservable(this);
	}

	getForms = async () => {
		const request = toCl<Form[]>(await $api.get(`${serverPaths.forms}?fields=id, avatar, location`),);
    
		const total = request.map(e => ({...e, location: typeof e.location === 'string' ? parseWkbPoint(e.location as string) : undefined})).filter(e => e.location);

		return total;
	};
}

export default new StoreMap();
