import {useSearchParams} from "react-router-dom";

interface UpdateParamsInterface {
	params: Record<string, string>,
	update: (key: string, value: string | number) => void,
	remove: (key: string) => void
}

const useUpdateParams = (): UpdateParamsInterface => {
	const [searchParams, setSearchParams] = useSearchParams();

	class UpdateParams implements UpdateParamsInterface {
		params = Object.fromEntries(searchParams.entries())

		update = (key: string, value: string | number) => {
			console.log(key, value)
			const newParams = new URLSearchParams(searchParams);
			const inParams = newParams.get(key) === value
			inParams ? newParams.delete(key) : newParams.set(key, String(value));
	
			setSearchParams(newParams);
		}

		remove = (key: string) => {
			console.log("key", key)
			const newParams = new URLSearchParams(searchParams);
			newParams.delete(key)
			
			setSearchParams(newParams)
		}
	}

	return new UpdateParams
};

export default useUpdateParams