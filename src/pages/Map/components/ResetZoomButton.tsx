import StoreMap from "@/pages/Map/store/Store-Map";
import { Map } from "@2gis/mapgl/types";
import { STANDART_ZOOM } from "@shared/CONST";
import { LocationDTO } from "@t/gen/dtoObjects";
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import Button from "@mui/material/Button";
import MapButton, { sxStyleMap } from "@/pages/Map/components/MapButton";

function ResetZoomButton({map, coords}: {map: Map, coords: LocationDTO}) {
	const handleReset = () => {
		map?.setCenter([coords!.lng, coords!.lat]);
		map?.setZoom(STANDART_ZOOM);
		console.log([coords!.lng, coords!.lat]);
	};

	return (
		<>
			<MapButton onClick={handleReset} color="salmon" variant="contained"><GpsNotFixedIcon sx={sxStyleMap} /></MapButton>
		</>
	);
}

export default ResetZoomButton;
