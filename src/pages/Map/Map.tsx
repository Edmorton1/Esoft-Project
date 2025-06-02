import MapWrapper from "@/pages/Map/components/MapWrapper";
import useGeolocation from "@/shared/hooks/useGeolocation";
import {useRef} from "react";
import useMapInstance from "@/pages/Map/hooks/useMapInstance";
import useClusterer from "@/pages/Map/hooks/useClusterer";
import { STANDART_ZOOM } from "@shared/CONST";
import StoreMap from "@/pages/Map/store/Store-Map";

function MapPage() {
	const containerRef = useRef<HTMLDivElement>(null);
	const coords = useGeolocation();

	const [mapgl, map] = useMapInstance(containerRef, coords);
	const clusterer = useClusterer(mapgl, map);

	const handleReset = () => {
		map?.setCenter([coords!.lng, coords!.lat]);
		map?.setZoom(STANDART_ZOOM);
		console.log([coords!.lng, coords!.lat]);
	};

	const handleSex = () => {
		StoreMap.changeSex()
	}

	return (
		<>
			<div>
				<button onClick={handleReset}>Сброс</button>
				<p>Пол: {StoreMap.sex}</p>
				<button onClick={handleSex}>Поменять пол</button>
			</div>
			<MapWrapper ref={containerRef} />
		</>
	);
}

export default MapPage;
