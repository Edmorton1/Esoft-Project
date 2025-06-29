import { Posts } from "@t/gen/Users";

interface propsInterface {
	post: Posts;
	handleEdit: () => void;
	handleDelete: () => void;
}

function Post({ post, handleEdit, handleDelete }: propsInterface) {
	return (
		<article>
			{post.text}
			{/* <p>Can Change: {String(StorePosts.canChange)}</p> */}
			<p>{post.files}</p>
			{/* <button onClick={handleDelete}>Удалить</button> */}
			<button onClick={handleEdit}>Изменить</button>
		</article>
	);
}

export default Post;

// {e.text}
// 					{/* <p>Can Change: {String(StorePosts.canChange)}</p> */}
//           <p>{e.files}</p>
//           <button onClick={handleDelete}>Удалить</button>
//           <button onClick={() => handleEdit(e.id)}>Изменить</button>
