import Edit from "@app/client/pages/Profile/widgets/Posts/components/Edit";
import Post from "@app/client/pages/Profile/widgets/Posts/components/Post";
import usePostsStore from "@app/client/pages/Profile/widgets/Posts/hooks/usePostsStore";
import type { Posts } from "@app/types/gen/Users";
import { useCallback, useState } from "react";

interface propsInterface {
  e: Posts
}

function Posts({e}: propsInterface) {
  const [edit, setEdit] = useState(0)
  const store = usePostsStore()

	const handleDelete = useCallback(() => store.delete(e.id), [e.id]);
	const handleEdit = useCallback(() => setEdit(e.id), [e.id]);
	const EditToZero = useCallback(() => setEdit(0), []);

	if (edit === e.id) {
		return <Edit post={e} key={e.id} EditToZero={EditToZero} />;
	}

	return <Post post={e} handleEdit={handleEdit} handleDelete={handleDelete} key={e.id} />;
}

export default Posts;
