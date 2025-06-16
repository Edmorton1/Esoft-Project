import useGeolocation from "@/shared/hooks/useGeolocation";
import useMap from "@/shared/hooks/Map/useMap";
import MapWrapper from "@/shared/hooks/Map/MapWrapper"
import { useRef } from "react"
import useSetCoords from "@/shared/widgets/MapWidget/hooks/useSetCoords";

interface propsInterface {
  callback: (data: number[]) => void,
  width: string,
  height: string
}

function MapWidget({callback, width, height}: propsInterface) {
  const containerRef = useRef(null)
	const coords = useGeolocation();

  const [mapgl, map] = useMap(containerRef, coords)
  useSetCoords(mapgl, map, (data) => callback(data))

  return <MapWrapper width={width} height={height} ref={containerRef} />
}

export default MapWidget