import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRef, useState } from "react";

interface propsInterface {
	handleEdit: () => void;
	handleDelete: () => void;
}

const PostMenu = ({handleEdit, handleDelete}: propsInterface) => {
	const [menu, setMenu] = useState(false);
	const menuRef = useRef<HTMLButtonElement>(null);

	const onOpenMenu = () => setMenu(true);
	const onCloseMenu = () => setMenu(false);

	return (
		<>
			<IconButton ref={menuRef} onClick={onOpenMenu}>
				<MoreVertIcon />
			</IconButton>
			<Menu open={menu} onClose={onCloseMenu} anchorEl={menuRef.current}>
				<MenuItem onClick={handleEdit}>Изменить</MenuItem>
				<MenuItem onClick={handleDelete}>Удалить</MenuItem>
			</Menu>
		</>
	);
};

export default PostMenu;
