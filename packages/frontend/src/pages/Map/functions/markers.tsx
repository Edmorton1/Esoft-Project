import { createRoots } from "@app/client/shared/hooks/Map/createRoot";
import StoreMap from "@app/client/pages/Map/store/Store-Map";
import { InputMarker } from "@2gis/mapgl-clusterer";
import MarkerMap from "@app/client/pages/Map/components/MarkerMap";

const createMarkers = async () => {
	const forms = await StoreMap.getForms();

	const markers: InputMarker[] = forms.map(e => {
		const container = createRoots(<MarkerMap avatar={e.avatar} sex={e.sex} />);

		return {
			type: "html",
			coordinates: e.location!,
			html: container,
			preventMapInteractions: false,
			payload: { id: e.id },
		};
	});

	return markers;
};

export default createMarkers;
