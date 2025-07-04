import {PasswordType, ProfileType} from "@app/client/pages/Settings/widgets/schema/Schemas";
import $api from "@app/client/shared/api/api";
import StoreBaseModal from "@app/client/shared/ui/modals/BaseModal/Store-BaseModal";
import StoreUser from "@app/client/shared/stores/Store-User";
import StoreFiles from "@app/client/shared/stores/StoreFiles";
import {serverPaths} from "@app/shared/PATHS";
import { URL_CLIENT } from "@app/shared/URLS";
import {action, makeObservable} from "mobx";
import {UseFormSetError} from "react-hook-form";

// export async function AvatarHandle(): Promise<string> {

// }

class StoreSettings extends StoreBaseModal {
	constructor() {
		super();
		makeObservable(this, {
			comparePassword: action,
			updateForm: action,
			uploadAvatar: action
		});
	}

	comparePassword = async (oldPass: string, newPass: string, setError: UseFormSetError<PasswordType>, navigate: Function) => {
		try {
			const request = await $api.post(serverPaths.passwordCompare, {old: oldPass, new: newPass});

			if (request.status === 200) {
				console.log("Пароль верный");
        await StoreUser.logout()
				this.closeModal()
        navigate("/")
			}
		} catch (error: any) {
			console.log("ОШИБКА")
			if (error.response?.status === 400) {
				setError("pass", {message: "Пароль неверный", type: "manual"});
			}
		}
	};

	updateForm = async (id: number, data: ProfileType) => {
		const request = await $api.put(serverPaths.profilePut, data)
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
