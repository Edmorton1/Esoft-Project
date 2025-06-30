import CreatePost from "@/pages/Profile/Posts/components/CreatePost";
import StorePosts from "@/pages/Profile/stores/Store-Posts";
import StoreProfile from "@/pages/Profile/stores/Store-Profile";
import useInfinitPaginationDoc from "@/shared/hooks/usePagination/useInfinitPaginationDoc";
import { serverPaths } from "@shared/PATHS";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import Edit from "@/pages/Profile/Posts/components/Edit";
import Post from "@/pages/Profile/Posts/components/Post";
import * as style from "@/shared/css/modules/CreatePost.module.scss"

function PostsHead() {
	const [edit, setEdit] = useState(0)

	// console.log("ПЕРЕД THEN CURSOR", StorePosts.cursor)

	useInfinitPaginationDoc(
		{main: `${serverPaths.postsGet}/${StoreProfile.profile?.id}`},
		data => StorePosts.lazyLoadPosts(data),
		"desc"
	);

	return (
		<section className={style.form}>
			<CreatePost />
			{StorePosts.posts?.map(e => {
        const handleDelete = () => StorePosts.delete(e.id)
				const handleEdit = () => setEdit(e.id)
				const handleSuccess = () => setEdit(0)

				if (edit === e.id) {
					return <Edit post={e} key={e.id} handleSuccess={handleSuccess} />
				}

        return <Post post={e} handleEdit={handleEdit} handleDelete={handleDelete} key={e.id} />
      })}
		</section>
	);
}

export default observer(PostsHead);
