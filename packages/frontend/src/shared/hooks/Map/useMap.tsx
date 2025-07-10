import {load} from "@2gis/mapgl";
import {useEffect, useState} from "react";
import {LocationDTO} from "@app/types/gen/dtoObjects";
import {mapDTO} from "@app/client/shared/hooks/Map/types";
import {STANDART_ZOOM} from "@app/shared/CONST";
import ResetZoomButton from "@app/client/shared/hooks/Map/ResetZoomButton";
import { createRoots } from "@app/client/shared/hooks/Map/createRoot";

function useMap(containerRef: React.RefObject<HTMLDivElement | null>, coords: LocationDTO | null,): mapDTO {
	const [mapgl, setMapgl] = useState<mapDTO[0]>(null);
	const [map, setMap] = useState<mapDTO[1]>(null);

	useEffect(() => {
		if (!containerRef.current || !coords) return;

		load().then(mapgl => {
			setMapgl(mapgl);
			const map = new mapgl.Map(containerRef.current!, {
				center: [coords.lng, coords.lat],
				zoom: STANDART_ZOOM,
				key: _GISKEY,
				disableZoomOnScroll: false,
			});
			setMap(map);

			const zoomContainer = createRoots(
				<ResetZoomButton coords={coords} map={map} />,
			);
			new mapgl.Control(map, zoomContainer, {position: "topRight"});
		});

		return () => map?.destroy();
	}, [containerRef, coords]);

	return [mapgl, map];
}

export default useMap;
