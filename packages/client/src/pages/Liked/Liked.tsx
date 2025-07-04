import StoreLikes from "@/shared/stores/StoreLikes";
import { serverPaths } from "@shared/PATHS";
import * as style from "@/shared/css/pages/Liked.module.scss";
import { observer } from "mobx-react-lite";
import useInfinitPaginationDoc from "@/shared/hooks/usePagination/doc/useInfinitPaginationDoc";
import Title from "@/shared/ui/mui_components/Ttile";
import EmptyText, { emptyFlex } from "@/shared/ui/mui_components/EmptyText";
import UserCardModule from "@/pages/Liked/modules/UserCardModule";

function Liked() {
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

export default observer(Liked);
// style={emptyStyle(StoreLikes.liked?.length)}
