import MarkerReg from "@app/client/shared/widgets/MapWidget/components/MarkerReg";
import { createRoots } from "@app/client/shared/hooks/Map/createRoot";
import { mapDTO } from "@app/client/shared/hooks/Map/types";
import { useEffect } from "react";
import { LocationCallback } from "@app/client/pages/Settings/widgets/Profile/ProfileSettings";
import { LocationDTO } from "@app/types/gen/dtoObjects";
import axios from "axios";

function useSetCoords(mapgl: mapDTO[0], map: mapDTO[1], callback: LocationCallback, coords?: LocationDTO | null) {
  useEffect(() => {
    if (!mapgl || !map) return;

    const marker = createRoots(<MarkerReg />)

    new mapgl.HtmlMarker(map, {
      coordinates: coords ? [coords.lng, coords.lat] : [37.6175, 55.7520],
      html: marker,
      anchor: [24, 44]
    })

    map.on('click', async (e) => {
      
      console.log(e.lngLat)
      axios.get(`https://catalog.api.2gis.com/3.0/items/geocode?lat=${e.lngLat[1]}&lon=${e.lngLat[0]}&fields=items.point&key=${_GISKEY}`)
        .then(data => console.log(data.data.result))
        .catch(e => console.log("ERROR", e.lnglat))

      callback(e.lngLat);
      
      new mapgl.HtmlMarker(map, {
      coordinates: e.lngLat,
      html: marker,
      anchor: [24, 44]
    })})

    // return () => {}
  }, [mapgl, map, coords])
}

export default useSetCoords