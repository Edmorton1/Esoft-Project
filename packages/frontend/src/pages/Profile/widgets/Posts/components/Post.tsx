import FileToCardMedia from "@app/client/pages/Profile/widgets/Posts/components/FileToCardMedia";
import StoreProfile from "@app/client/pages/Profile/stores/Store-Profile";
import Subtitle from "@app/client/shared/ui/mui_components/Subtitles";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Posts } from "@app/types/gen/Users";
import * as style from "@app/client/shared/css/modules/CreatePost.module.scss"
import usePostsStore from "@app/client/pages/Profile/widgets/Posts/hooks/usePostsStore";
import { observer } from "mobx-react-lite";
import StoreUser from "@app/client/shared/stores/Store-User";
import PostMenu from "@app/client/pages/Profile/widgets/Posts/components/PostMenu";

interface propsInterface {
	post: Posts;
	handleEdit: () => void;
	handleDelete: () => void;
}

function Post({ post, handleEdit, handleDelete }: propsInterface) {
	const store = usePostsStore()
	

	return (
		// <div>sasddas</div>
		<Card component={"article"}>
			<CardHeader
				avatar={<Avatar src={StoreProfile.profile?.avatar} />}
				title={<>
					{StoreProfile.profile?.name}
				</>}
				subheader={<Subtitle>{new Date(post.created_at).toLocaleString()}</Subtitle>}
				action={StoreUser.user?.id === store.profileid &&
					<PostMenu handleDelete={handleDelete} handleEdit={handleEdit} />
				}
			/>
			<CardContent>
				<Typography>{post.text}</Typography>
				<div className={style.form__cardContent} >
					{post.files.map(fileLink => (
						<FileToCardMedia key={fileLink} fileLink={fileLink} />
					))}
				</div>
				
				{/* <p>Can Change: {String(StorePosts.canChange)}</p> */}
				{/* <p>{post.files}</p> */}
				{/* <button onClick={handleDelete}>Удалить</button> */}
				{/* <button onClick={handleEdit}>Изменить</button> */}

			</CardContent>
			
		</Card>
	);
}

export default observer(Post);
