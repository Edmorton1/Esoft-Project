import PopupMap from "@app/client/pages/Map/components/PopupMap";
import createMarkers from "@app/client/pages/Map/functions/markers";
import { createRootsDynamic } from "@app/client/shared/hooks/Map/createRoot";
import {ClustererDTO, mapDTO} from "@app/client/shared/hooks/Map/types";
import StoreMap from "@app/client/pages/Map/store/Store-Map";
import {Clusterer} from "@2gis/mapgl-clusterer";
import {reaction} from "mobx";
import {useEffect, useState} from "react";

function useClusterer(
	mapgl: mapDTO[0] | null,
	map: mapDTO[1] | null,
): ClustererDTO {
	const [clustererState, setClustererState] = useState<ClustererDTO>(null);

	useEffect(() => {
		if (!mapgl || !map) return;

		const clusterer = new Clusterer(map, {
			radius: 80,
		});

		setClustererState(clusterer);

		createMarkers(map).then(markers => clusterer.load(markers));

		const disposer = reaction(
			() => StoreMap.sex,
			async () => {
				const markers = await createMarkers(map);
				clusterer.load(markers);
			},
		);

		const [popupContainer, popupRoot] = createRootsDynamic();

		map.on("click", () => {
			console.log("click map");
			popupContainer.hidden = true;
		});
		map.on("zoom", () => {
			console.log("zoom");
			popupContainer.hidden = true;
		});

		const popup = new mapgl.HtmlMarker(map, {
			coordinates: [0, 0],
			html: popupContainer,
			anchor: [80, 145],
			zIndex: 1,
		});

		clusterer.on("click", e => {
			console.log(e.target);
			if (!Array.isArray(e.target.data)) {
				popupContainer.hidden = true;
				const id = e.target.data.payload.id;
				popup.setCoordinates(e.lngLat);
				map.setCenter(e.lngLat);
				popupRoot.render(<PopupMap id={id} />);
				popupContainer.hidden = false;
				console.log(id);
			} else {
				const zoom = map.getZoom();
				map.setCenter(e.lngLat);
				map.setZoom(zoom + 1.5);
			}
		});

		return () => clusterer.destroy()! && disposer()
	}, [mapgl, map]);

	return clustererState;
}

export default useClusterer;
