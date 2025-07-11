import $api from "@app/client/shared/api/api";
import StoreForm from "@app/client/shared/stores/Store-Form";
import storeSocket from "@app/client/shared/api/Store-Socket";
// import StoreTags from "@app/client/shared/stores/Store-Tags"
import StoreLikes from "@app/client/shared/stores/StoreLikes";
import { User, UserSchema } from "@app/types/gen/Users";
import { UserDTO } from "@app/types/gen/dtoObjects";
import { paths, serverPaths } from "@app/shared/PATHS";
import { makeAutoObservable, runInAction } from "mobx";
import {
	RegistrationDTOClient,
	StoreUserRegistrationSchema,
} from "@app/client/types/RegistrationZOD";
import { UseFormSetError } from "react-hook-form";
import axios from "axios";
import { toSOSe } from "@app/shared/JSONParsers";
import StoreLogin from "@app/client/shared/ui/modals/Login/stores/Store-Login";
import StorePairs from "@app/client/pages/Pairs/widgets/stores/Store-Pairs";
import { LoginErrorTypes } from "@app/types/gen/ErrorTypes";

class StoreUser {
	user: User | null | undefined = undefined;

	constructor() {
		makeAutoObservable(this);
	}

	loadModules = async () => {
		// if (!logout) {
		// 	console.log("LOAD MODULES");
		// 	StoreForm.initial();
		// 	StoreLikes.initial();
		// 	StorePairs.initial();
		// 	// await StoreMessages.initial()
		// 	// await StoreTags.initial()
		// 	console.log("RELOAD 2");
		// 	await storeSocket.waitSocket(storeSocket.socket!);
		// 	await storeSocket.socket!.send(toSOSe("userid", this.user!.id));
		// } else {
		// 	runInAction(() => {
		// 		this.user = null;
		// 		StoreForm.form = null;
		// 		// StoreTags.tags = null;
		// 		StoreLikes.likes = null;
		// 		StorePairs.pairs = [];
		// 	});
		// }

		console.log("LOAD MODULES");
		StoreForm.initial();
		StoreLikes.initial();
		StorePairs.initial();
		console.log("RELOAD 2");
		await storeSocket.waitSocket(storeSocket.socket!);
		await storeSocket.socket!.send(toSOSe("userid", this.user!.id));
	};

	login = (data: UserDTO, setError: UseFormSetError<UserDTO>) => {
		// try {
		$api
			.post(`${serverPaths.login}`, data)
			.then(data => UserSchema.parse(data.data))
			.then(user => runInAction(() => (this.user = user)))
			.then(() => this.initial())
			.then(() => StoreLogin.closeModal())
			.then(() => (window.location.href = `${paths.profile}/${this.user?.id}`))
			// .then(() => reset())

			.catch(err => {
				if (axios.isAxiosError(err)) {
					const status = err.status;
					const response = err.response?.data as LoginErrorTypes;
					if (status === 401 && response.type === "email") {
						setError("email", {
							message: response.message,
							type: "manual",
						});
					} else if (status === 401 && response.type === "password") {
						setError("password", {
							message: response.message,
							type: "manual",
						});
					}
				}
			});
	};

	logout = async () => {
		await $api.post(serverPaths.logout);
		window.location.href = "/";
	};

	initial = () => {
		$api
			.get(serverPaths.initial)
			.then(data => runInAction(() => (this.user = data.data)))
			.then(() => this.loadModules())

			.catch(err => console.log(err));
	};

	registration = async (user: RegistrationDTOClient) => {
		const { avatar, ...body } = user;
		const fd = new FormData();
		fd.append("json", JSON.stringify(body));
		if (avatar && typeof avatar === "object") {
			fd.append("avatar", avatar[0]);
		}
		const request = (
			await $api.post(`${serverPaths.registration}`, fd, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
		).data;

		const form = StoreUserRegistrationSchema.parse(request);

		window.location.href = `${paths.profile}/${form.user.id}`;

		// console.log(request);

		// runInAction(() => {
		// 	this.user = request.user;
		// 	StoreForm.form = response.form;
		// });

		// this.initial();
	};
}

export default new StoreUser();
