import StoreMap from "@app/client/pages/Map/store/Store-Map";
import {observer} from "mobx-react-lite";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MapButton, { sxStyleMap } from "@app/client/shared/hooks/Map/MapButton";

function SexButton() {
	const handleSex = () => StoreMap.changeSex();

	return (
		<>
			<MapButton
				onClick={handleSex}
				color="plombir"
				variant="contained">
				{StoreMap.sex === "man" ? (
					<MaleIcon sx={sxStyleMap} />
				) : StoreMap.sex === "woman" ? (
					<FemaleIcon sx={sxStyleMap} />
				) : (
					<PeopleAltIcon sx={sxStyleMap} />
				)}
			</MapButton>
		</>
	);
}

export default observer(SexButton);
