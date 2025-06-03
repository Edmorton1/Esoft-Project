import {GISKEY} from "@/envClient";
import {load} from "@2gis/mapgl";
import {useEffect, useState} from "react";
import {LocationDTO} from "@t/gen/dtoObjects";
import {mapDTO} from "@/pages/Map/functions/types";
import {STANDART_ZOOM} from "@shared/CONST";
import {createRoots} from "@/pages/Map/functions/parsers";
import ResetZoomButton from "@/pages/Map/components/ResetZoomButton";
import SexButton from "@/pages/Map/components/SexButton";

function useMapInstance(
	containerRef: React.RefObject<HTMLDivElement | null>,
	coords: LocationDTO | null,
): mapDTO {
	const [mapgl, setMapgl] = useState<mapDTO[0]>(null);
	const [map, setMap] = useState<mapDTO[1]>(null);

	useEffect(() => {
		if (!containerRef.current || !coords) return;

		load().then(mapgl => {
			setMapgl(mapgl);
			const map = new mapgl.Map(containerRef.current!, {
				center: [37.75, 55.86],
				zoom: STANDART_ZOOM,
				key: GISKEY,
				disableZoomOnScroll: false,
			});
			setMap(map);

			const zoomContainer = createRoots(<ResetZoomButton coords={coords} map={map} />)
			new mapgl.Control(map,
				zoomContainer,
				{position: 'topRight'}
			)
			
			const sexContainer = createRoots(<SexButton />)
			new mapgl.Control(map,
				sexContainer,
				{position: "topRight"}
			)
		});

		return map?.destroy()
		
	}, [containerRef, coords]);

	return [mapgl, map];
}

export default useMapInstance;
