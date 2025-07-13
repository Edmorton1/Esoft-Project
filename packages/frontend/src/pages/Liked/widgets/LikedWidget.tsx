import StoreLikes from "@app/client/shared/stores/Likes/StoreLikes";
import { serverPaths } from "@app/shared/PATHS";
import * as style from "@app/client/shared/css/pages/Liked.module.scss";
import { observer } from "mobx-react-lite";
import useInfinitPaginationDoc from "@app/client/shared/hooks/usePagination/doc/useInfinitPaginationDoc";
import Title from "@app/client/shared/ui/mui_components/Ttile";
import EmptyText, { emptyFlex } from "@app/client/shared/ui/mui_components/EmptyText";
import UserCardModule from "@app/client/pages/Liked/widgets/modules/UserCardModule";

function LikedWidget() {
  useInfinitPaginationDoc(
    {
      main: serverPaths.likesGet,
    },
    {
      cursor: StoreLikes.cursor,
      setCursor: StoreLikes.setCursor,
      history: StoreLikes.history,
      setHistory: StoreLikes.setHistory,
      stop: StoreLikes.stop,
      setStop: StoreLikes.setStop
    },
    data => StoreLikes.lazyLoadLiked(data.data),
    "desc",
    "cursor"
  );
  
  return (
    <>
      <Title>Вы понравились этим пользователям</Title>
      <section className={style.container} style={emptyFlex(StoreLikes.liked?.length)}>
        {/* <button onClick={() => console.log(toJS(StoreLikes.liked),toJS(StoreLikes.likes))}>Store</button> */}
        {/* <button onClick={() => console.log(stop)} style={{position: "fixed"}}>Стоп</button> */}

        {StoreLikes.liked?.length ? (
          <section className={style.container__cards}>
            {StoreLikes.liked?.map(e => <UserCardModule key={e.id} data={e} />)}
          </section>
        ) : <EmptyText />}
      </section>
    </>
  );
}

export default observer(LikedWidget);
// style={emptyStyle(StoreLikes.liked?.length)}
