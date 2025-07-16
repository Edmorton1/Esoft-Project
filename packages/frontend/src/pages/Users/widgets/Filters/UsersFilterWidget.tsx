import Filters from "@app/client/pages/Users/widgets/Filters/modules/Filter/Filters";
import Sotrting from "@app/client/pages/Users/widgets/Filters/modules/Sorting/Sorting";
import Paper from "@mui/material/Paper"
import * as style from "@app/client/shared/css/pages/Users.module.scss"

function UsersFilterWidget() {
	console.log("FILTER RE");

	return (
		<Paper component={"aside"} className={style.section__filters}>
			<Filters />
			<Sotrting />
		</Paper>
	);
}

export default UsersFilterWidget;
