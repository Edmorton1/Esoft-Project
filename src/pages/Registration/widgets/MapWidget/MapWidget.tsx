import useGeolocation from "@/shared/hooks/useGeolocation";
import useMap from "@/shared/hooks/Map/useMap";
import MapWrapper from "@/shared/hooks/Map/MapWrapper"
import { useRef } from "react"
import useSetCoords from "@/pages/Registration/widgets/MapWidget/hooks/useSetCoords";

function MapWidget() {
  const containerRef = useRef(null)
	const coords = useGeolocation();

  const [mapgl, map] = useMap(containerRef, coords)
  useSetCoords(mapgl, map)

  return <MapWrapper ref={containerRef} />
}

export default MapWidget