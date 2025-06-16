import {PasswordType, ProfileType} from "@/pages/Settings/widgets/schema/Schemas";
import $api from "@/shared/api/api";
import StoreBaseModal from "@/shared/components/BaseModal/Store-BaseModal";
import StoreUser from "@/shared/stores/Store-User";
import {serverPaths} from "@shared/PATHS";
import { URL_CLIENT } from "@shared/URLS";
import {action, makeObservable} from "mobx";
import {UseFormSetError} from "react-hook-form";

class StorePassword extends StoreBaseModal {
	constructor() {
		super();
		makeObservable(this, {
			comparePassword: action,
			updateForm: action
		});
	}

	comparePassword = async (oldPass: string, newPass: string, setError: UseFormSetError<PasswordType>) => {
		try {
			const request = await $api.post(`${serverPaths.passwordCompare}/${StoreUser.user?.id}`, {old: oldPass, new: newPass});

			if (request.status === 200) {
				console.log("Пароль верный");
        await StoreUser.logout()
        window.location.replace(URL_CLIENT)
			}
		} catch (error: any) {
			if (error.response?.status === 400) {
				setError("pass", {message: "Пароль неверный"});
			}
		}
	};

	updateForm = async (id: number, data: ProfileType) => {
		const request = await $api.put(`${serverPaths.profilePut}/${id}`, data)
		console.log('ФОРМА ПОМЕНЯНА', request)
	}
}

export default new StorePassword();
