import StoreLikes from "@/shared/stores/StoreLikes";
import { serverPaths } from "@shared/PATHS";
import * as style from "@/shared/css/pages/Liked.module.scss";
import { observer } from "mobx-react-lite";
import useInfinitPaginationDoc from "@/shared/hooks/usePagination/useInfinitPaginationDoc";
import Title from "@/shared/ui/Ttile";
import EmptyText, { emptyFlex } from "@/shared/ui/EmptyText";
import UserCardWidget from "@/pages/Liked/widgets/UserCardWidget";

function Liked() {
	// useGetBy(`${serverPaths.likesGet}/${StoreUser.user?.id}?lat=${StoreForm.form?.location?.lat}&lng=${StoreForm.form?.location?.lng}?cursor=${StoreLikes.cursor}`, {callback: (data) => StoreLikes.likedUser(data)})
	const loaded = StoreLikes.liked && StoreLikes.liked?.length > 0
	// !loaded ? {main: serverPaths.likesGet} : {main: "null"},

	useInfinitPaginationDoc(
		{
			main: serverPaths.likesGet,
		},
		{
			cursor: StoreLikes.cursor,
			setCursor: (cursor => StoreLikes.cursor = cursor),
			history: StoreLikes.history,
			setHistory: (url => StoreLikes.history.push(url)),
			stop: StoreLikes.stop,
			setStop: (() => StoreLikes.stop = true)
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
						{StoreLikes.liked?.map(e => <UserCardWidget key={e.id} data={e} />)}
					</section>
				) : <EmptyText />}
			</section>
		</>
	);
}

export default observer(Liked);
// style={emptyStyle(StoreLikes.liked?.length)}
