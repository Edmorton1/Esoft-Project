import * as styles from "@/shared/css/Map.module.scss";
import useGetBy from "@/shared/hooks/useGetBy";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {paths, serverPaths} from "@shared/PATHS";

function PopupMap({id}: {id: number}) {
	const form = useGetBy<"forms">(`${serverPaths.forms}/${id}`, {
		returnOne: true,
	});

	return (
		<Card className={styles.map__popup}>
			<a href={`${paths.profile}/${id}`} target="_blank" rel="noopener noreferrer">
				<CardHeader
					className={styles.map__popup_header}
					title={
						<Typography variant="h6" sx={{fontWeight: 600}}>
							{form?.name}
						</Typography>
					}
				/>
			</a>

			<CardContent className={styles.map__popup_content}>
				<Typography variant="body2" color="text.secondary">
					Возраст: <strong>{form?.age}</strong>
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Цель: {form?.target}
				</Typography>
				{form?.tags?.length ? (
					<Stack direction="row" spacing={0.3} flexWrap="wrap" mt={0.3}>
						{form?.tags?.length ? (
							<Stack direction="row" spacing={0.3} flexWrap="wrap">
								{form.tags.slice(0, 3).map(tag => (
									<Chip
										key={tag.id}
										label={tag.tag}
										size="small"
										color="primary"
										variant="outlined"
									/>
								))}
								{form.tags.length > 3 && (
									<Chip
										label="..."
										size="small"
										color="primary"
										variant="outlined"
									/>
								)}
							</Stack>
						) : null}
					</Stack>
				) : null}
			</CardContent>
		</Card>
	);
}

export default PopupMap;

// return <div className={styles.map__popup}>
//   <div>id: {form?.id}</div>
//   <div>Имя: {form?.name}</div>
//   <div>Возраст: {form?.age}</div>
//   <div>Цель: {form?.target}</div>
//   <div>Тэги: {form?.tags?.map(e => e.tag).join(' ')}</div>
// </div>
