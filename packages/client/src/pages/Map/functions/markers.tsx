import { createRoots } from "@/shared/hooks/Map/createRoot";
import StoreMap from "@/pages/Map/store/Store-Map";
import { InputMarker } from "@2gis/mapgl-clusterer";
import MarkerMap from "@/pages/Map/components/MarkerMap";
import { Map } from "@2gis/mapgl/types";

const createMarkers = async (map: Map) => {
	const forms = await StoreMap.getForms();

	const markers: InputMarker[] = forms.map(e => {
		const container = createRoots(<MarkerMap map={map} avatar={e.avatar} sex={e.sex} />);

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
