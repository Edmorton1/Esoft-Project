import MarkerReg from "@/shared/widgets/MapWidget/components/MarkerReg";
import { createRoots } from "@/shared/hooks/Map/createRoot";
import { mapDTO } from "@/shared/hooks/Map/types";
import { useEffect } from "react";
import { LocationCallback } from "@/pages/Settings/widgets/Profile/ProfileSettings";
import { LocationDTO } from "@t/gen/dtoObjects";

function useSetCoords(mapgl: mapDTO[0], map: mapDTO[1], callback: LocationCallback, coords?: LocationDTO | null) {
  useEffect(() => {
    if (!mapgl || !map) return;

    const marker = createRoots(<MarkerReg />)

    const user = new mapgl.HtmlMarker(map, {
      coordinates: coords ? [coords.lng, coords.lat] : [37.6175, 55.7520],
      html: marker,
      anchor: [24, 44]
    })

    map.on('click', async (e) => {
      callback(e.lngLat), new mapgl.HtmlMarker(map, {
      coordinates: e.lngLat,
      html: marker,
      anchor: [24, 44]
    })})

    // return () => {}
  }, [mapgl, map, coords])
}

export default useSetCoords