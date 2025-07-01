import {URL_SERVER} from "@shared/URLS";
import axios, { AxiosError } from "axios";
import {PREFIX} from "@shared/CONST";
import StoreForm from "@/shared/stores/Store-Form";

const $api = axios.create({
	baseURL: URL_SERVER + PREFIX,
	withCredentials: true,
});

$api.interceptors.request.use(config => {
	const lng = StoreForm.form?.location?.lng
	const lat = StoreForm.form?.location?.lat

	if (lng !== null && lat !== null) {
		config.headers['x-lnglat'] = JSON.stringify([lng, lat])
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
