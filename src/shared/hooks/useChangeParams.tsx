import {useSearchParams} from "react-router-dom";

const useUpdateParams = (): [Record<string, string>, (key: string, value: string | number, remove?: boolean, add?: boolean) => void, (key: string) => void] => {
	const [searchParams, setSearchParams] = useSearchParams();

	const params = Object.fromEntries(searchParams.entries())

	const updateParams = (
		key: string,
		value: string | number,
		remove: boolean = true,
		add: boolean = false
	) => {
		// console.log(key, value)
		const newParams = new URLSearchParams(searchParams);
		if (add) {
			let inParams: (string | number)[] = newParams.get(key)?.split(', ') ?? []
			if (inParams.includes(value)) {
				if (remove) {
					inParams = inParams.filter(e => e != value)
				}
			} else {
				inParams.push(value)
			}
			inParams = inParams.filter(e => e != '')
			if (inParams.length === 0) {
				newParams.delete(key)
			} else {
				newParams.set(key, inParams.join(', '))
			}
		}
		if (remove) {
			// console.log(newParams.get(key) === value)
			const inParams = newParams.get(key) === value
			inParams ? newParams.delete(key) : newParams.set(key, String(value));
		}
		if (!remove && !add) {
			newParams.set(key, String(value))
		}

		setSearchParams(newParams);
	}

	const removeParams = (key: string) => {
		// console.log("key", key)
		const newParams = new URLSearchParams(searchParams);
		newParams.delete(key)
		
		setSearchParams(newParams)
	}

	return [params, updateParams, removeParams]
};

export default useUpdateParams
