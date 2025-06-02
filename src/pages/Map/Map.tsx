import {GISKEY} from "@/envClient";
import MapWrapper from "@/pages/Map/components/MapWrapper";
import useGeolocation from "@/shared/hooks/useGeolocation";
import {load} from "@2gis/mapgl";
import {useEffect, useRef, useState} from "react";
import MarkerMap from "@/pages/Map/components/MarkerMap";
import ReactDOM from "react-dom/client";
import {Clusterer, InputMarker} from "@2gis/mapgl-clusterer";
import StoreMap from "@/pages/Map/store/Store-Map";
import PopupMap from "@/pages/Map/components/PopupMap";
import { Map } from "@2gis/mapgl/types";

function MapPage() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [popupData, setPoputData] = useState<{ id: number; lngLat: [number, number] } | null>(null);

	const coords = useGeolocation();

	useEffect(() => {
		if (!containerRef.current || !coords) return;

		let map: Map | undefined;
		let clusterer: Clusterer | undefined;

		const setup = async () => {
			const mapgl = await load();

			const map = new mapgl.Map(containerRef.current!, {
				center: [37.75, 55.86],
				zoom: 13,
				key: GISKEY,
				disableZoomOnScroll: false,
			});

			clusterer = new Clusterer(map, {
				radius: 60,
			});

			map.on('click', () => console.log('click map'))

			const forms = await StoreMap.getForms();

			function reactToHtml(element: React.ReactElement) {
				const el = document.createElement("div");
				ReactDOM.createRoot(el).render(element);
				return el;
			}

			const htmlMarker = document.createElement("div");
			htmlMarker.classList.add("marker");
			htmlMarker.innerText = "HTML Marker 2";
			htmlMarker.addEventListener("click", () => console.log("adsadsads"));

			const markers: InputMarker[] = forms.map(e => ({
				type: "html",
				coordinates: e.location!,
				html: reactToHtml(
					<MarkerMap map={map} avatar={e.avatar} sex={e.sex} />,
				),
				preventMapInteractions: false,
				payload: {id: e.id},
			}));

			clusterer.load(markers);

			const popupContainer = document.createElement("div")
			const popup = new mapgl.HtmlMarker(map, {
				coordinates: [0, 0],
				html: popupContainer,
				anchor: [80, 145],
				zIndex: 1,
			})
			const popupRoot = ReactDOM.createRoot(popupContainer)

			clusterer.on('click', e => {
				//@ts-ignore
				const id = e.target.data.payload.id
				popup.setCoordinates(e.lngLat)
				map.setCenter(e.lngLat)
				popupRoot.render(<PopupMap id={id}/>)
				console.log(id)
			})
		};

		setup();

		return () => {map && map.destroy(); clusterer && clusterer.destroy()};
	}, [containerRef, coords]);

	return (
		<>
			<MapWrapper ref={containerRef} />
		</>
	);
}

export default MapPage;

// const popup = new mapgl.HtmlMarker(map, {
//   coordinates: [0, 0],
//   html: `<div style="
//     background: white;
//     padding: 8px 12px;
//     border-radius: 5px;
//     box-shadow: 0 2px 8px rgba(0,0,0,0.15);
//     max-width: 200px;
//     font-size: 14px;
//     color: black;
//     ">
//   </div>`,
// });
// const popupContent = popup.getContent().querySelector('div');

// const ses = preCoords.forEach(coord => {
//   new mapgl.CircleMarker(map, {
//     coordinates: coord
//   }).on('click', e => {
//     popup.setCoordinates(coord);
//     popupContent!.textContent =`Координаты: ${coord[0].toFixed(5)}, ${coord[1].toFixed(5)}`;
//     popup.getContent();
//   })
