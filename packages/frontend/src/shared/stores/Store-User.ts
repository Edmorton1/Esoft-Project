import $api from "@app/client/shared/api/api";
import StoreForm from "@app/client/shared/stores/Store-Form";
import storeSocket from "@app/client/shared/api/Store-Socket";
import StoreLikes from "@app/client/shared/stores/Likes/StoreLikes";
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
import { IS_GOOGLE_USER } from "@app/shared/HEADERS";
import BroadCast from "@app/client/shared/stores/BroadCast";

// interface BroadcastChannelEmitter extends BroadcastChannel {
// 	event: {
// 		data: channelTypes
// 	}
// }

class StoreUser {
	user: User | null | undefined = undefined;
	is_google_user: boolean = false;
	private channel: BroadCast<"initial" | "logout"> = new BroadCast("store-user");

	constructor() {
		makeAutoObservable(this);

		this.channel.register({
			initial: this.initial,
			logout: () => {
				window.location.href = "/";
			},
		});
	}

	loadModules = async () => {
		console.log("LOAD MODULES");
		StoreForm.initial();
		StoreLikes.initial();
		StorePairs.initial();
		console.log("RELOAD 2");
		await storeSocket.waitSocket(storeSocket.socket!);
		await storeSocket.socket!.send(toSOSe("userid", this.user!.id));
	};

	login = async (data: UserDTO, setError: UseFormSetError<UserDTO>) => {
		try {
			const request = (await $api.post(`${serverPaths.login}`, data)).data;
			const parsed = UserSchema.parse(request);
			runInAction(() => (this.user = parsed));
			this.initial();
			StoreLogin.closeModal();

			this.channel.startFunction("initial");

			// window.location.href = `${paths.profile}/${this.user?.id}`;
		} catch (err) {
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
		}
	};

	logout = async () => {
		await $api.post(serverPaths.logout);

		this.channel.startFunction("logout");

		window.location.href = "/";
	};

	initial = async () => {
		try {
			console.log("INITIAL", window.location.href)
			const request = await $api.get(serverPaths.initial);
			runInAction(() => (this.user = request.data));
			this.is_google_user = request.headers[IS_GOOGLE_USER] === "true";
			this.loadModules();

			if (window.location.href === _URL_CLIENT + "/") window.location.href = `${paths.profile}/${this.user?.id}`;

			console.log("ИС ГУГЛ ЮЗЕР", this.is_google_user);
		} catch (err) {
			console.log(err);
		}
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

		this.channel.startFunction("initial");
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
