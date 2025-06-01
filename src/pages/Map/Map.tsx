import {GISKEY} from "@/envClient";
import MarkerMap from "@/pages/Map/components/Marker";
import MapWrapper from "@/pages/Map/MapWrapper";
import useGeolocation from "@/shared/hooks/useGeolocation";
import {load} from "@2gis/mapgl";
import { Map, Marker } from "@2gis/mapgl/types";
import {useEffect, useRef} from "react";

function MapPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const coords = useGeolocation()

	useEffect(() => {
    if (!containerRef.current || !coords) return;

		let map: Map | undefined;
    let marker: Marker | undefined;


		load().then(mapgl => {
			const map = new mapgl.Map(containerRef.current!, {
				center: [coords.lng, coords.lat],
				zoom: 13,
				key: GISKEY,
			});
      map.on("click", e => {
        console.log(e)
        marker?.destroy()
        // marker = new mapgl.HtmlMarker(map, {
        //   coordinates: e.lngLat,
        //   html: MarkerMap,
        //   anchor: [100, 100]
        // })
        marker = new mapgl.Marker(map, {
          coordinates: e.lngLat,
          // icon: "https://static.vecteezy.com/system/resources/thumbnails/036/497/738/small_2x/ai-generated-black-man-in-business-suit-for-a-meeting-isolated-on-transparent-background-png.png",
        })
      })
		});

		return () => map && map.destroy();
	}, [containerRef, coords]);

	return <>
    <MapWrapper ref={containerRef} />
  </>
}

export default MapPage;
