import {useEffect} from "react";
import {LocationDTO} from "@app/types/gen/dtoObjects";
import {mapDTO} from "@app/client/shared/hooks/Map/types";
import {createRoots} from "@app/client/shared/hooks/Map/createRoot";
import ResetZoomButton from "@app/client/shared/hooks/Map/ResetZoomButton";
import SexButton from "@app/client/pages/Map/components/SexButton";

function useMapCustomization(
	map: mapDTO[1],
	coords: LocationDTO | null,
	mapgl: mapDTO[0],
) {
	useEffect(() => {
		if (!map || !mapgl || !coords) return;

		const sexContainer = createRoots(<SexButton />);
		new mapgl.Control(map, sexContainer, {position: "topRight"});

	}, [map, coords, mapgl]);
}

export default useMapCustomization;
