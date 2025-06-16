import MarkerReg from "@/shared/widgets/MapWidget/components/MarkerReg";
import StoreRegistration from "@/pages/Registration/widgets/stores/Store-Registration";
import { createRoots } from "@/shared/hooks/Map/createRoot";
import { mapDTO } from "@/shared/hooks/Map/types";
import { useEffect } from "react";
import { MapPointerEvent } from "@2gis/mapgl/types";

function useSetCoords(mapgl: mapDTO[0], map: mapDTO[1], callback: (data: number[]) => void) {
  useEffect(() => {
    if (!mapgl || !map) return;

    const marker = createRoots(<MarkerReg />)

    map.on('click', async (e) => {callback(e.lngLat), new mapgl.HtmlMarker(map, {
      coordinates: e.lngLat,
      html: marker,
      anchor: [24, 44]
    })})
  }, [mapgl, map])
}

export default useSetCoords