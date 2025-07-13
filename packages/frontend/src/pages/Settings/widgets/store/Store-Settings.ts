import {PasswordType, ProfileType} from "@app/client/pages/Settings/widgets/schema/Schemas";
import $api from "@app/client/shared/api/api";
import StoreBaseModal from "@app/client/shared/ui/modals/BaseModal/Store-BaseModal";
import StoreUser from "@app/client/shared/stores/Store-User";
import StoreFiles from "@app/client/shared/stores/StoreFiles";
import {serverPaths} from "@app/shared/PATHS";
import { URL_CLIENT } from "@app/shared/URLS";
import {action, makeObservable} from "mobx";
import {UseFormSetError} from "react-hook-form";
import BroadCast from "@app/client/shared/stores/BroadCast";

// export async function AvatarHandle(): Promise<string> {

// }

class StoreSettings extends StoreBaseModal {
	channel: BroadCast<"updateForm"> = new BroadCast("store-setting")

	constructor() {
		super();
		makeObservable(this, {
			comparePassword: action,
			updateForm: action,
			uploadAvatar: action
		});

		this.channel.register({
			updateForm: () => window.location.replace(URL_CLIENT)
		})
	}

	comparePassword = async (oldPass: string, newPass: string, setError: UseFormSetError<PasswordType>) => {
		try {
			const request = await $api.post(serverPaths.passwordCompare, {old: oldPass, new: newPass});

			if (request.status === 200) {
				console.log("Пароль верный");
        await StoreUser.logout()
			}
		} catch (error: any) {
			console.log("ОШИБКА")
			if (error.response?.status === 400) {
				setError("pass", {message: "Пароль неверный", type: "manual"});
			}
		}
	};

	updateForm = async (data: ProfileType) => {
		const request = await $api.put(serverPaths.profilePut, data)

		this.channel.startFunction("updateForm")

		window.location.replace(URL_CLIENT)
		console.log('ФОРМА ПОМЕНЯНА', request)
	}

	uploadAvatar = async (file: File) => {
		const formData = new FormData();
		formData.append('avatar', file)
		console.log(formData.get(file.name))

		await StoreFiles.postAvatar(formData)
	}
}

export default new StoreSettings();
