import CreatePost from "@/pages/Profile/Posts/components/CreatePost";
import StorePosts from "@/pages/Profile/stores/Store-Posts";
import StoreProfile from "@/pages/Profile/stores/Store-Profile";
import useInfinitPaginationDoc from "@/shared/hooks/usePagination/useInfinitPaginationDoc";
import { serverPaths } from "@shared/PATHS";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import Edit from "@/pages/Profile/Posts/components/Edit";
import Post from "@/pages/Profile/Posts/components/Post";

function PostsHead() {
	const [edit, setEdit] = useState(0)

	useInfinitPaginationDoc(
		`${serverPaths.postsGet}/${StoreProfile.profile?.id}?cursor=${StorePosts.cursor}`,
		StorePosts.cursor === null,
		data => StorePosts.lazyLoadPosts(data),
	);

	return (
		<section>
			{StorePosts.posts?.map(e => {
        const handleDelete = () => StorePosts.delete(e.id)
				const handleEdit = () => setEdit(e.id)
				const handleSuccess = () => setEdit(0)

				if (edit === e.id) {
					return <Edit post={e} key={e.id} handleSuccess={handleSuccess} />
				}

        return <Post post={e} handleEdit={handleEdit} handleDelete={handleDelete} key={e.id} />
      })}
      <CreatePost />
		</section>
	);
}

export default observer(PostsHead);
