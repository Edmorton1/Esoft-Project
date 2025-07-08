import { observer } from "mobx-react-lite";
import PairsWidget from "@app/client/pages/Pairs/widgets/PairsWidget";
import StoreUser from "@app/client/shared/stores/Store-User";
import EmptyText from "@app/client/shared/ui/mui_components/EmptyText";

function Pairs() {
	
	if (!StoreUser.user) {
		return <EmptyText infoType="no-authorize"/>
	}

	return <PairsWidget />
}

export default observer(Pairs);
