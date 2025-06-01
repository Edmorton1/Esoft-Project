import {GISKEY} from "@/envClient";
import preCoords from "@/pages/Map/coords";
import MapWrapper from "@/pages/Map/MapWrapper";
import useGeolocation from "@/shared/hooks/useGeolocation";
import {load} from "@2gis/mapgl";
import {ReactElement, useEffect, useRef} from "react";
import MarkerMap from "@/pages/Map/MarkerMap";
import ReactDOM from "react-dom/client";
import {Clusterer, InputMarker} from "@2gis/mapgl-clusterer";
import {HtmlMarker, Map} from "@2gis/mapgl/types";
import StoreMap from "@/pages/Map/store/Store-Map";

function MapPage() {
	const containerRef = useRef<HTMLDivElement>(null);

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

			const forms = await StoreMap.getForms();

			function createMarkerElement(element: React.ReactElement) {
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
				html: createMarkerElement(
					<MarkerMap map={map} avatar={e.avatar as string} />,
				),
				preventMapInteractions: false,
			}));

			clusterer.load(markers);

			// map.on("click", e => {
			//   console.log(e)
			//   marker?.destroy()
			//   // marker = new mapgl.Marker(map, {
			//   //   coordinates: e.lngLat,
			//   //   // icon: "https://static.vecteezy.com/system/resources/thumbnails/036/497/738/small_2x/ai-generated-black-man-in-business-suit-for-a-meeting-isolated-on-transparent-background-png.png",
			//   // })
			//   marker = new mapgl.CircleMarker(map, {
			//     coordinates: e.lngLat
			//   })
			// })
			// marker?.on('click', (e) => console.log(e))
		};

		setup();

		return () => map && map.destroy();
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
