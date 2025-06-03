import MapWrapper from "@/pages/Map/components/MapWrapper";
import useGeolocation from "@/shared/hooks/useGeolocation";
import {useRef} from "react";
import useMapInstance from "@/pages/Map/hooks/useMapInstance";
import useClusterer from "@/pages/Map/hooks/useClusterer";
import {STANDART_ZOOM} from "@shared/CONST";
import StoreMap from "@/pages/Map/store/Store-Map";

import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import Button from "@mui/material/Button";

function MapPage() {
	const containerRef = useRef<HTMLDivElement>(null);
	const coords = useGeolocation();

	const [mapgl, map] = useMapInstance(containerRef, coords);
	const clusterer = useClusterer(mapgl, map);

	return (
		<>
			<MapWrapper ref={containerRef} />
		</>
	);
}

export default MapPage;
