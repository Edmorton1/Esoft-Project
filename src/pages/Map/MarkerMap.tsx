import * as styles from "@/shared/css/Marker.module.scss";
import {Map} from "@2gis/mapgl/types";
import RoomIcon from "@mui/icons-material/Room";
import ReactDOM from "react-dom/client";

function MarkerMap({map, avatar}: {map: Map, avatar: string}) {
	return (
		// eslint-disable-next-line
		<div
			onClick={() => console.log("sadasdasd")}
			className={styles.map__marker}>
			<img src={avatar} alt="" />
		</div>
	);
}

export default MarkerMap;
