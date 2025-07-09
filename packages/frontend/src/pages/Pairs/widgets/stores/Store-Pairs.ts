import $api from "@app/client/shared/api/api";
import { serverPaths } from "@app/shared/PATHS";
import { Form } from "@app/types/gen/Users";
import { makeAutoObservable, runInAction } from "mobx";

class StorePairs {
	pairs: Form[] = [];
	// cursor: number | null = null

	constructor() {
		makeAutoObservable(this);
	}

	initial = async () => {
		const { data } = await $api.get(serverPaths.likesPairs);

		console.log({ data });

		runInAction(() => this.pairs = data);
	};

	unshinft = (form: Form) => {
		runInAction(() => this.pairs.unshift(form))
	}

	removeById = (id: number) => {
		runInAction(() => this.pairs = this.pairs!.filter(e => e.id !== id))
	}
}

export default new StorePairs();
