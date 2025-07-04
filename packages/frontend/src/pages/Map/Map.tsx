import MapWrapper from "@app/client/shared/hooks/Map/MapWrapper";
import useGeolocation from "@app/client/shared/hooks/useGeolocation";
import {useRef} from "react";
import useMap from "@app/client/shared/hooks/Map/useMap";
import useClusterer from "@app/client/pages/Map/hooks/useClusterer";
import useMapCustomization from "@app/client/pages/Map/hooks/useMapCustomization";
import Title from "@app/client/shared/ui/mui_components/Ttile";

function MapPage() {
	const containerRef = useRef<HTMLDivElement>(null);
	const coords = useGeolocation();

	const [mapgl, map] = useMap(containerRef, coords);
	useMapCustomization(map, coords, mapgl)
	const clusterer = useClusterer(mapgl, map);

	return (
		<section>
			<Title>Карта всех пользователей</Title>
			<MapWrapper height="78vh" width="100%" ref={containerRef} />
		</section>
	);
}

export default MapPage;
