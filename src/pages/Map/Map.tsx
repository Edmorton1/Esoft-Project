import {GISKEY} from "@/envClient";
import MapWrapper from "@/pages/Map/components/MapWrapper";
import useGeolocation from "@/shared/hooks/useGeolocation";
import {load} from "@2gis/mapgl";
import {useEffect, useRef} from "react";
import MarkerMap from "@/pages/Map/components/MarkerMap";
import ReactDOM from "react-dom/client";
import {Clusterer, InputMarker} from "@2gis/mapgl-clusterer";
import StoreMap from "@/pages/Map/store/Store-Map";
import PopupMap from "@/pages/Map/components/PopupMap";
import { Map } from "@2gis/mapgl/types";
import useMapInstance from "@/pages/Map/modules/useMapInstance";

function MapPage() {
	const containerRef = useRef<HTMLDivElement>(null);
	const coords = useGeolocation();

	const [asd, dsa] = useMapInstance(containerRef, coords)
	setTimeout(() => console.log(asd, dsa), 3000)

	// useEffect(() => {
	// 	if (!containerRef.current || !coords) return;

	// 	let map: Map | undefined;
	// 	let clusterer: Clusterer | undefined;

	// 	const setup = async () => {
	// 		const mapgl = await load();

	// 		const map = new mapgl.Map(containerRef.current!, {
	// 			center: [37.75, 55.86],
	// 			zoom: 13,
	// 			key: GISKEY,
	// 			disableZoomOnScroll: false,
	// 		});

	// 		clusterer = new Clusterer(map, {
	// 			radius: 80,
	// 		});

	// 		map.on('click', () => {console.log('click map'); popupContainer.hidden = true })
	// 		map.on('zoom', () => {console.log('zoom'); popupContainer.hidden = true})

	// 		const forms = await StoreMap.getForms();

	// 		function reactToHtml(element: React.ReactElement) {
	// 			const el = document.createElement("div");
	// 			ReactDOM.createRoot(el).render(element);
	// 			return el;
	// 		}

	// 		const htmlMarker = document.createElement("div");
	// 		htmlMarker.classList.add("marker");
	// 		htmlMarker.innerText = "HTML Marker 2";
	// 		htmlMarker.addEventListener("click", () => console.log("adsadsads"));

	// 		const markers: InputMarker[] = forms.map(e => ({
	// 			type: "html",
	// 			coordinates: e.location!,
	// 			html: reactToHtml(
	// 				<MarkerMap map={map} avatar={e.avatar} sex={e.sex} />,
	// 			),
	// 			preventMapInteractions: false,
	// 			payload: {id: e.id},
	// 		}));

	// 		clusterer.load(markers);

	// 		const popupContainer = document.createElement("div")
	// 		const popup = new mapgl.HtmlMarker(map, {
	// 			coordinates: [0, 0],
	// 			html: popupContainer,
	// 			anchor: [80, 145],
	// 			zIndex: 1,
	// 		})

	// 		const popupRoot = ReactDOM.createRoot(popupContainer)

	// 		clusterer.on('click', e => {
	// 			console.log(e.target)
	// 			if (!Array.isArray(e.target.data)) {
	// 				popupContainer.hidden = true
	// 				//@ts-ignore
	// 				const id = e.target.data.payload.id
	// 				popup.setCoordinates(e.lngLat)
	// 				map.setCenter(e.lngLat)
	// 				popupRoot.render(<PopupMap id={id}/>)
	// 				popupContainer.hidden = false
	// 				console.log(id)
	// 			} else {
	// 				const zoom = map.getZoom()
	// 				map.setCenter(e.lngLat)
	// 				map.setZoom(zoom + 1.5)
	// 			}
	// 		})
	// 	};

	// 	setup();

	// 	return () => {map && map.destroy(); clusterer && clusterer.destroy()};
	// }, [containerRef, coords]);

	return (
		<>
			<MapWrapper ref={containerRef} />
		</>
	);
}

export default MapPage;
