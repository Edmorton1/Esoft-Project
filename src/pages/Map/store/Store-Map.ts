import $api from "@/shared/api/api";
import {toCl} from "@shared/MAPPERS";
import {serverPaths} from "@shared/PATHS";
import {Form} from "@t/gen/Users";
import {makeAutoObservable} from "mobx";

class StoreMap {
	constructor() {
		makeAutoObservable(this);
	}

	getForms = async () => {
		const request = toCl<Form[]>(await $api.get(`${serverPaths.forms}?fields=id, avatar, sex, location`),);
    
		const total = request.filter(e => e.location).map(e => ({...e, location: [e.location!.lng, e.location!.lat]}));

		return total;
	};
}

export default new StoreMap();
