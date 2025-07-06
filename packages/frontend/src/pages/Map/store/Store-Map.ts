import { sexType } from "@app/client/shared/hooks/Map/types";
import $api from "@app/client/shared/api/api";
import {serverPaths} from "@app/shared/PATHS";
import {Form, FormSchema} from "@app/types/gen/Users";
import {makeAutoObservable} from "mobx";
import z from "zod";

class StoreMap {
	sex: sexType = 'all'
	private _rawForms: (Omit<Form, 'location'> & {location: number[]})[] = []

	constructor() {
		makeAutoObservable(this);
	}

	getForms = async () => {
		let total;
		
		if (this._rawForms.length === 0) {
			const request = z.array(FormSchema).parse((await $api.get(`${serverPaths.forms}?fields=id, avatar, sex, location`)).data);
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
