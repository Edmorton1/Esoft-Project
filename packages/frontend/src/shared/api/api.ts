import {URL_SERVER} from "@app/shared/URLS";
import axios, { AxiosError } from "axios";
import {PREFIX} from "@app/shared/CONST";
import StoreForm from "@app/client/shared/stores/Store-Form";
import { XLNGLAT } from "@app/shared/HEADERS";

const $api = axios.create({
	baseURL: URL_SERVER + PREFIX,
	withCredentials: true,
});

$api.interceptors.request.use(config => {
	const lng = StoreForm.form?.location?.lng
	const lat = StoreForm.form?.location?.lat

	if (lng !== null && lat !== null) {
		config.headers[XLNGLAT] = JSON.stringify([lng, lat])
	}

	return config
})

$api.interceptors.response.use(
	res => res,
	(err: AxiosError) => {
		console.error(err)
		return Promise.reject(err)
  },
);

export default $api;
