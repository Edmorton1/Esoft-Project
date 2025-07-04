import { sexType } from "@/shared/hooks/Map/types";
import $api from "@/shared/api/api";
import {toCl} from "@shared/MAPPERS";
import {serverPaths} from "@shared/PATHS";
import {Form} from "@t/gen/Users";
import {makeAutoObservable} from "mobx";

class StoreMap {
	sex: sexType = 'all'
	private _rawForms: (Omit<Form, 'location'> & {location: number[]})[] = []

	constructor() {
		makeAutoObservable(this);
	}

	getForms = async () => {
		let total;
		
		if (this._rawForms.length === 0) {
			const request = toCl<Form[]>(await $api.get(`${serverPaths.forms}?fields=id, avatar, sex, location`),);
			total = request.filter(e => e.location).map(e => ({...e, location: [e.location!.lng, e.location!.lat]}));
		} else {
			total = this._rawForms
		}


		if (this._rawForms.length === 0) {
			this._rawForms = total
		}
		
		if (this.sex !== 'all') {
			total = this.sex === 'man'
				?	total.filter(e => e.sex === true)
				:	total.filter(e => e.sex !== true)
		}

		return total;
	};

	changeSex = () => {
		if (this.sex === 'all') {
			this.sex = 'woman'
		} else if (this.sex === 'woman') {
			this.sex = 'man'
		} else if (this.sex === 'man') {
			this.sex = 'all'
		}
	}
}

export default new StoreMap();
