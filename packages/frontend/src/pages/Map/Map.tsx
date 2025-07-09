import MapWrapper from "@app/client/shared/hooks/Map/MapWrapper";
import useGeolocation from "@app/client/shared/hooks/useGeolocation";
import {useRef} from "react";
import useMap from "@app/client/shared/hooks/Map/useMap";
import useClusterer from "@app/client/pages/Map/hooks/useClusterer";
import useMapCustomization from "@app/client/pages/Map/hooks/useMapCustomization";
import Title from "@app/client/shared/ui/mui_components/Ttile";
import StoreForm from "@app/client/shared/stores/Store-Form";
import Typography from "@mui/material/Typography";
import StoreUser from "@app/client/shared/stores/Store-User";

function MapPage() {
	const containerRef = useRef<HTMLDivElement>(null);
	const coords = useGeolocation();

	const [mapgl, map] = useMap(containerRef, coords);
	useMapCustomization(map, coords, mapgl)
	useClusterer(mapgl, map);

	if (!StoreUser.user) {
		return <>
			<Title>Карта всех пользователей</Title>
			<Typography textAlign={"center"} color="textSecondary" sx={{margin: "auto 0"}}>Карта доступна только зарегестрированным пользователям</Typography>
		</>
	}

	return <>
		<Title>Карта всех пользователей</Title>
		<MapWrapper height="78vh" width="100%" ref={containerRef} />
	</>
}

export default MapPage;
