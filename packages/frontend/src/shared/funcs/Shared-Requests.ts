import { LocationDTO } from "@app/types/gen/dtoObjects";
import axios from "axios";
import { z } from "zod";

const itemSchema = z.object({
	full_name: z.string().optional(),
});

const geocodeResponseSchema = z.object({
  // meta: z.object({
  //   code: z.number()
  // }),
	result: z.object({
		items: z.array(itemSchema),
	}),
});

// const result = {
// 	result: {
// 		items: [
// 			{ id: 1321232131, type: "asd" },
// 			{ full_name: "Тюмень, Тюменский 3-й" },
// 			{ full_name: "Тюмень, Восточный" },
// 			{ full_name: "Тюмень" },
// 			{ full_name: "Тюмень городской округ" },
// 			{ full_name: "Тюменская область" },
// 			{ full_name: "Тюменская область" },
// 		],
// 	},
// };

class SharedRequest {
	cityByCoords = async (lnglat: number[]): Promise<LocationDTO> => {
		const [lng, lat] = lnglat;
    try {
      console.log("ЛНГЛАТ", lnglat);
      const {data} = await axios.get(`https://catalog.api.2gis.com/3.0/items/geocode?lat=${lat}&lon=${lng}&fields=items.point&key=${_GISKEY}`)
      console.log("ДАТА ОТ ЗАПРОСА", data);

      if (data.meta.code !== 200) {return {city: "", lng, lat}}

      const parsed = geocodeResponseSchema.parse(data).result.items.filter(e => e.full_name !== undefined)
      console.log("asda", parsed)
      let city = parsed[0]?.full_name;
      if (city) {
        city = city.split(",")[0];
      } else {
        city = "";
      }

      const total = { city, lng, lat };
      console.log("CITY BY COORDS RESULT", city, lng, lat);
      return total;
    }
    catch (err) {
      console.error(err)
      return {city: "", lng, lat}
    }
	};
}

export default new SharedRequest();
