import $api from "@/shared/api/api";

export const requestPagination = (url: string, firstRender: boolean, callback: Function, setStop: Function, setFetching: Function) => {
	console.log("ФЕТЧИНГ", url);
	$api
		.get(url)
		.then(data => {
			console.log({ FETCHI_FETCH: data });
			return data;
		})
		.then(data => {
			if (data.data.messages.length === 0) {
				if (firstRender) {
					callback(data);
				}
				setStop(true);
			} else {
				callback(data);
			}
		})
		.then(() => setFetching(false))

		.catch(() => setStop(false));
};
