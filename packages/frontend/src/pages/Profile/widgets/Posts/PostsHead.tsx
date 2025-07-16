import useInfinitPaginationDoc from "@app/client/shared/hooks/usePagination/doc/useInfinitPaginationDoc";
import { serverPaths } from "@app/shared/PATHS";
import { observer } from "mobx-react-lite";
import * as style from "@app/client/shared/css/modules/CreatePost.module.scss"
import usePostsStore from "@app/client/pages/Profile/widgets/Posts/hooks/usePostsStore";
import CreatePost from "@app/client/pages/Profile/widgets/Posts/components/CreatePost";
import StoreUser from "@app/client/shared/stores/Store-User";
import Posts from "@app/client/pages/Profile/widgets/Posts/components/Posts";

function PostsHead() {
	const store = usePostsStore()

	// console.log("ПЕРЕД THEN CURSOR", StorePosts.cursor)

	useInfinitPaginationDoc(
		{main: `${serverPaths.postsGet}/${store.profileid}`},
		{
			cursor: store.cursor,
			setCursor: store.setCursor,
			history: store.history,
			setHistory: store.setHistory,
			stop: store.stop,
			setStop: store.setStop
		},
		data => store.lazyLoadPosts(data),
		"desc",
		"id"
	);

	return (
		<section className={style.form}>
			{StoreUser.user?.id === store.profileid && <CreatePost />}
			{store.posts?.map(e => <Posts e={e} key={e.id}/>)}
		</section>
	);
}

export default observer(PostsHead);
