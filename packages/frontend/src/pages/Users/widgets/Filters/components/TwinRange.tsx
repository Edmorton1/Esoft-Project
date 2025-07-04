import {useState} from "react";
import useDebounceParams from "@app/client/shared/hooks/useDebounceParams";
import Slider from "@mui/material/Slider"
import useUpdateParams from "@app/client/shared/hooks/useChangeParams";
import { z } from "zod";

function TwinRange() {
  const [params] = useUpdateParams()

	const [minAgeParam, setMinAgeParam] = useDebounceParams("min_age");
  const [maxAgeParam, setMaxAgeParam] = useDebounceParams("max_age"); 

	const [value, setValue] = useState<[number, number]>([Number(params.min_age) || 18, Number(params.max_age) || 122]);

	const changeHandle = (e: any, v: number[]) => {
		const parsedV = z.tuple([z.number(), z.number()]).parse(v)
    console.log(parsedV)
    
		setValue(parsedV)

		if (v[0] !== value[0]) setMinAgeParam(parsedV[0])
		if (v[1] !== value[1]) setMaxAgeParam(parsedV[1])
    
	};

	const marks = [
  {
		value: value[0],
    label: value[0],
  },
  {
		value: value[1],
    label: value[1],
  },
];

	return <Slider
			min={18}
			max={122}
			marks={marks}
			value={value}
			onChange={changeHandle}
		/>
}

export default TwinRange;
