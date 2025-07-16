import { paths } from "@app/shared/PATHS";
import * as style from "@app/client/shared/css/pages/Pairs.module.scss";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Subtitle from "@app/client/shared/ui/mui_components/Subtitles";
import ForumIcon from "@mui/icons-material/Forum";
import PhoneIcon from "@mui/icons-material/Phone";
import LastActive from "@app/client/shared/ui/mui_module_components/LastActive";
import { Link } from "react-router-dom";
import StoreRoom from "@app/client/pages/Room/WebRTC/Store-Room";
import StoreUser from "@app/client/shared/stores/Store-User";
import DeleteIcon from '@mui/icons-material/Delete';
import StoreLikes from "@app/client/shared/stores/Likes/StoreLikes";
import UnderTypo from "@app/client/shared/ui/mui_components/UnderTypo";
import { Form } from "@app/types/gen/Users";
import { memo } from "react";

function PairCardWidget({ data }: { data: Form }) {
	const handleClick = () => StoreRoom.makeCall(StoreUser.user!.id, data.id);
	const handleDelete = () => StoreLikes.delete(data);
	const url = `${paths.profile}/${data.id}`;

	return (
		<Paper key={data.id}>
			<CardHeader
				avatar={
					<Link to={url}>
						<Avatar src={data.avatar} />
					</Link>
				}
				title={
					<>
						<Link to={url}>
							<UnderTypo>{data.name}</UnderTypo>
						</Link>
						<LastActive last_active={data.last_active} />
						<div className={style.container__actions}>
							<Link to={`${paths.messages}/${data.id}`}>
								<Subtitle>
									<ForumIcon /> Написать
								</Subtitle>
							</Link>
							<Subtitle onClick={handleClick}>
								<PhoneIcon />
								Позвонить
							</Subtitle>
							<Subtitle onClick={handleDelete}>
								<DeleteIcon />
								Удалить
							</Subtitle>
						</div>
					</>
				}
			/>
		</Paper>
	);
}

export default memo(PairCardWidget);
