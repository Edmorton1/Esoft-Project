import MenuItem from "@mui/material/MenuItem"
import { Menu } from "react-admin"

function PostActions() {
  return <Menu>
    <MenuItem>Изменить</MenuItem>
    <MenuItem>Удалить</MenuItem>
  </Menu>
}

export default PostActions