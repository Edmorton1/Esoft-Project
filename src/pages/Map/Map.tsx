import MapWrapper from "@/shared/hooks/Map/MapWrapper";
import useGeolocation from "@/shared/hooks/useGeolocation";
import {useRef} from "react";
import useMap from "@/shared/hooks/Map/useMap";
import useClusterer from "@/pages/Map/hooks/useClusterer";
import useMapCustomization from "@/pages/Map/hooks/useMapCustomization";
import Title from "@/shared/ui/mui_components/Ttile";

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
