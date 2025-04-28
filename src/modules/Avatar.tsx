import { dropAvatar } from "./funcDropAva";

function Avatar() {
	return <input type="file" onChange={dropAvatar} />;
}

export default Avatar;