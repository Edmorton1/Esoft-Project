import * as style from "@/shared/css/pages/Pairs.module.scss";
import Title from "@/shared/ui/mui_components/Ttile";
import { observer } from "mobx-react-lite";
import PairCardWidget from "@/pages/Pairs/widgets/PairCardWidget";
import EmptyText, { emptyFlex } from "@/shared/ui/mui_components/EmptyText";
import StorePairs from "@/pages/Pairs/widgets/stores/Store-Pairs";

function Pairs() {
	// useGetBy(`${serverPaths.likesPairs}`, {callback: (data) => StorePairs.initial(data)})

	return (
		<>
			<Title>Вы понравились друг другу</Title>
			<section className={style.container} style={emptyFlex(StorePairs.pairs?.length)}>
				{StorePairs.pairs?.length
          ? StorePairs.pairs?.map(e => <PairCardWidget key={e.id} data={e} />)
          : <EmptyText />
        }
			</section>
		</>
	);
}

export default observer(Pairs);
