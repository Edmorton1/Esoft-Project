import FileToCardMedia from "@/pages/Profile/widgets/Posts/components/FileToCardMedia";
import StoreProfile from "@/pages/Profile/stores/Store-Profile";
import Subtitle from "@/shared/ui/mui_components/Subtitles";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Posts } from "@t/gen/Users";
import * as style from "@/shared/css/modules/CreatePost.module.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRef, useState } from "react";
import usePostsStore from "@/pages/Profile/widgets/Posts/hooks/usePostsStore";
import { observer } from "mobx-react-lite";

interface propsInterface {
	post: Posts;
	handleEdit: () => void;
	handleDelete: () => void;
}

function Post({ post, handleEdit, handleDelete }: propsInterface) {
	const [menu, setMenu] = useState(false)
	const menuRef = useRef<HTMLButtonElement>(null)

	const onOpenMenu = () => setMenu(true)
	const onCloseMenu = () => setMenu(false)
	
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
				action={store.canChange &&
					<>
					<IconButton ref={menuRef} onClick={onOpenMenu}>
						<MoreVertIcon />
					</IconButton>
					<Menu open={menu} onClose={onCloseMenu} anchorEl={menuRef.current}>
							<MenuItem onClick={handleEdit}>Изменить</MenuItem>
							<MenuItem onClick={handleDelete}>Удалить</MenuItem>
					</Menu>
					</>
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
