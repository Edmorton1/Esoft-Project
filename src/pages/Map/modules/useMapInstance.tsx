import {GISKEY} from "@/envClient";
import MapWrapper from "@/pages/Map/components/MapWrapper";
import useGeolocation from "@/shared/hooks/useGeolocation";
import {load} from "@2gis/mapgl";
import {useEffect, useRef, useState} from "react";
import MarkerMap from "@/pages/Map/components/MarkerMap";
import ReactDOM from "react-dom/client";
import {Clusterer, InputMarker} from "@2gis/mapgl-clusterer";
import StoreMap from "@/pages/Map/store/Store-Map";
import PopupMap from "@/pages/Map/components/PopupMap";
import {Map} from "@2gis/mapgl/types";
import {LocationDTO} from "@t/gen/dtoObjects";

function useMapInstance(
	containerRef: React.RefObject<HTMLDivElement | null>,
	coords: LocationDTO | null,
) {
  const [mapgl, setMapgl] = useState<any | null>(null)
  const [map, setMap] = useState<Map | null>(null)

	useEffect(() => {
		if (!containerRef.current || !coords) return;

		const setup = async () => {

			const mapgl = await load();
      setMapgl(mapgl)
			const map = new mapgl.Map(containerRef.current!, {
				center: [37.75, 55.86],
				zoom: 13,
				key: GISKEY,
				disableZoomOnScroll: false,
			});
      setMap(map)
		};

    setup()
	}, [containerRef, coords]);

  return [mapgl, map]
}

export default useMapInstance