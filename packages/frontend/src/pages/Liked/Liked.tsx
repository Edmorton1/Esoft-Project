import { observer } from "mobx-react-lite";
import LikedWidget from "@app/client/pages/Liked/widgets/LikedWidget";
import StoreUser from "@app/client/shared/stores/Store-User";
import EmptyText from "@app/client/shared/ui/mui_components/EmptyText";

function Liked() {

	if (!StoreUser.user) {
		return <EmptyText infoType="no-authorize"/>
	}

	return <LikedWidget />
}

export default observer(Liked);
// style={emptyStyle(StoreLikes.liked?.length)}
