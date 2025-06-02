import * as styles from "@/shared/css/Map.module.scss";
import {Map} from "@2gis/mapgl/types";
import { PLACEHOLDER_IMG } from "@shared/PUBLIC_IMG";

function MarkerMap({map, avatar, sex}: {map: Map, avatar?: string, sex: boolean}) {
	return (
		// eslint-disable-next-line
		<div
			onClick={() => console.log("sadasdasd")}
			style={{borderColor: sex ? '#4287f5' : 'pink'}}
			className={styles.map__marker}>
			<img src={avatar || PLACEHOLDER_IMG} alt="" />
		</div>
	);
}

export default MarkerMap;
