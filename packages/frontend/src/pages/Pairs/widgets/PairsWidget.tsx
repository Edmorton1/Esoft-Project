import * as style from "@app/client/shared/css/pages/Pairs.module.scss";
import Title from "@app/client/shared/ui/mui_components/Ttile";
import { observer } from "mobx-react-lite";
import PairCardWidget from "@app/client/pages/Pairs/widgets/components/PairCardWidget";
import EmptyText, { emptyFlex } from "@app/client/shared/ui/mui_components/EmptyText";
import StorePairs from "@app/client/pages/Pairs/widgets/stores/Store-Pairs";

function PairsWidget() {
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

export default observer(PairsWidget);
