import useInfinitPaginationDoc from "@/shared/hooks/usePagination/doc/useInfinitPaginationDoc";
import { serverPaths } from "@shared/PATHS";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import * as style from "@/shared/css/modules/CreatePost.module.scss"
import usePostsStore from "@/pages/Profile/widgets/Posts/hooks/usePostsStore";
import CreatePost from "@/pages/Profile/widgets/Posts/components/CreatePost";
import Edit from "@/pages/Profile/widgets/Posts/components/Edit";
import Post from "@/pages/Profile/widgets/Posts/components/Post";

function PostsHead() {
	const [edit, setEdit] = useState(0)
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
			{store.canChange && <CreatePost />}
			{store.posts?.map(e => {
        const handleDelete = () => store.delete(e.id)
				const handleEdit = () => setEdit(e.id)
				const EditToZero = () => setEdit(0)

				if (edit === e.id) {
					return <Edit post={e} key={e.id} EditToZero={EditToZero} />
				}

        return <Post post={e} handleEdit={handleEdit} handleDelete={handleDelete} key={e.id} />
      })}
		</section>
	);
}

export default observer(PostsHead);
