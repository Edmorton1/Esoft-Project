import StoreProfile from "@/pages/Profile/stores/Store-Profile";
import Subtitle from "@/shared/ui/Subtitles";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Posts } from "@t/gen/Users";

interface propsInterface {
	post: Posts;
	handleEdit: () => void;
	handleDelete: () => void;
}

function Post({ post, handleEdit, handleDelete }: propsInterface) {
	return (
		<div>sasddas</div>
		// <Card component={"article"}>
		// 	<CardHeader
		// 		avatar={<Avatar src={StoreProfile.profile?.avatar} />}
		// 		title={<>
		// 			{StoreProfile.profile?.name}
		// 		</>}
		// 		subheader={<Subtitle>{new Date(post.created_at).toLocaleString()}</Subtitle>}
		// 	/>
		// 	{post.text}
		// 	{/* <p>Can Change: {String(StorePosts.canChange)}</p> */}
		// 	<p>{post.files}</p>
		// 	{/* <button onClick={handleDelete}>Удалить</button> */}
		// 	<button onClick={handleEdit}>Изменить</button>
		// </Card>
	);
}

export default Post;

// {e.text}
// 					{/* <p>Can Change: {String(StorePosts.canChange)}</p> */}
//           <p>{e.files}</p>
//           <button onClick={handleDelete}>Удалить</button>
//           <button onClick={() => handleEdit(e.id)}>Изменить</button>
