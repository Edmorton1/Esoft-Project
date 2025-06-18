import { GISKEY } from "@/envClient"
import { LocationDTO } from "@t/gen/dtoObjects";
import axios from "axios"
import { z } from 'zod';

const itemSchema = z.object({
  full_name: z.string(),
});

const geocodeResponseSchema = z.object({
  result: z.object({
    items: z.array(itemSchema),
  }),
});

class SharedRequest {
  cityByCoords = async (lnglat: number[]): Promise<LocationDTO> => {
    const [lng, lat] = lnglat
    const {data} = await axios.get(`https://catalog.api.2gis.com/3.0/items/geocode?lat=${lat}&lon=${lng}&fields=items.point&key=${GISKEY}`)
    const parsed = geocodeResponseSchema.parse(data)

    console.log(parsed?.result?.items[0]?.full_name?.split(','), lng, lat, 'poison');
    const total = {city: parsed?.result?.items[0]?.full_name?.split(',')[0], lng, lat}
    return total
  }
}

export default new SharedRequest