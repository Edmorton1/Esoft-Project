import {PasswordType, ProfileType} from "@/pages/Settings/widgets/schema/Schemas";
import $api from "@/shared/api/api";
import StoreBaseModal from "@/shared/ui/components/BaseModal/Store-BaseModal";
import StoreUser from "@/shared/stores/Store-User";
import StoreFiles from "@/shared/stores/StoreFiles";
import {serverPaths} from "@shared/PATHS";
import { URL_CLIENT } from "@shared/URLS";
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

	comparePassword = async (oldPass: string, newPass: string, setError: UseFormSetError<PasswordType>) => {
		try {
			const request = await $api.post(serverPaths.passwordCompare, {old: oldPass, new: newPass});

			if (request.status === 200) {
				console.log("Пароль верный");
				// ВИДИМО В STOER USER LOGOUT ОШИБКА!
				//@ts-ignore
        // await StoreUser.logout()
        // window.location.replace(URL_CLIENT)
			}
		} catch (error: any) {
			if (error.response?.status === 400) {
				setError("pass", {message: "Пароль неверный"});
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
