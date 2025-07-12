import * as style from "@app/client/shared/css/modules/Map.module.scss";
import { PLACEHOLDER_IMG } from "@app/shared/PUBLIC";

function MarkerMap({avatar, sex}: {avatar?: string, sex: boolean}) {
	console.log("МАРКЕР МАП")
	return (
		<div
			style={{borderColor: sex ? '#4287f5' : 'pink'}}
			className={style.marker}>
			<img src={avatar || PLACEHOLDER_IMG} alt="" />
		</div>
	);
}

export default MarkerMap;
