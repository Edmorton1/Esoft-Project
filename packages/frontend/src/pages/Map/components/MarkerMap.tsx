import * as style from "@app/client/shared/css/modules/Map.module.scss";
import {Map} from "@2gis/mapgl/types";
import { PLACEHOLDER_IMG } from "@app/shared/PUBLIC";

function MarkerMap({map, avatar, sex}: {map: Map, avatar?: string, sex: boolean}) {
	console.log("МАРКЕР МАП")
	return (
		// eslint-disable-next-line
		<div
			onClick={() => console.log("sadasdasd")}
			style={{borderColor: sex ? '#4287f5' : 'pink'}}
			className={style.map__marker}>
			<img src={avatar || PLACEHOLDER_IMG} alt="" />
		</div>
	);
}

export default MarkerMap;
