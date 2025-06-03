import StoreMap from "@/pages/Map/store/Store-Map";
import {observer} from "mobx-react-lite";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Button from "@mui/material/Button";
import MapButton, { sxStyleMap } from "@/pages/Map/components/MapButton";

function SexButton() {
	const handleSex = () => StoreMap.changeSex();

	return (
		<>
			<MapButton
				onClick={handleSex}
				color="salmon"
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
