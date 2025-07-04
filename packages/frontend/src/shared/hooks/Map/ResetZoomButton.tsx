import { Map } from "@2gis/mapgl/types";
import { STANDART_ZOOM } from "@app/shared/CONST";
import { LocationDTO } from "@app/types/gen/dtoObjects";
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import MapButton, { sxStyleMap } from "@app/client/shared/hooks/Map/MapButton";

function ResetZoomButton({map, coords}: {map: Map, coords: LocationDTO}) {
	const handleReset = () => {
		map?.setCenter([coords!.lng, coords!.lat]);
		map?.setZoom(STANDART_ZOOM);
		console.log([coords!.lng, coords!.lat]);
	};

	return (
		<>
			<MapButton onClick={handleReset} color="plombir" variant="contained"><GpsNotFixedIcon sx={sxStyleMap} /></MapButton>
		</>
	);
}

export default ResetZoomButton;
