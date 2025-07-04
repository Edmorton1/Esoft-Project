import useGeolocation from "@app/client/shared/hooks/useGeolocation";
import useMap from "@app/client/shared/hooks/Map/useMap";
import MapWrapper from "@app/client/shared/hooks/Map/MapWrapper"
import { useRef } from "react"
import useSetCoords from "@app/client/shared/widgets/MapWidget/hooks/useSetCoords";
import { LocationCallback } from "@app/client/pages/Settings/widgets/Profile/ProfileSettings";

interface propsInterface {
  callback: LocationCallback,
  width: string,
  height: string
}

function MapWidget({callback, width, height}: propsInterface) {
  const containerRef = useRef(null)
	const coords = useGeolocation();

  const [mapgl, map] = useMap(containerRef, coords)
  useSetCoords(mapgl, map, (data) => callback(data), coords)


  return <MapWrapper width={width} height={height} ref={containerRef} />
}

export default MapWidget