import {URL_SERVER} from "@shared/URLS";
import axios, { AxiosError } from "axios";
import {PREFIX} from "@shared/CONST";

const $api = axios.create({
	baseURL: URL_SERVER + PREFIX,
	withCredentials: true,
});

$api.interceptors.response.use(
	res => res,
	(err: AxiosError) => {
		console.error(err)
		return Promise.reject(err)
  },
);

export default $api;
