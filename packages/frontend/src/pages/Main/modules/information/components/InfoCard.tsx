import * as style from "@app/client/shared/css/pages/Main/modules/information/Information.module.scss";
import { ICard } from "@app/client/pages/Main/modules/information/components/Info";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { BG_ALT, BG_PAPER, BG_THIRD } from "@app/shared/COLORS";

function InfoCard({card}: {card: ICard}) {
	return (
		<Card
			sx={{
				border: "10px solid",
				borderColor: BG_ALT,
				borderRadius: "50px",
				minWidth: "350px",
			}}
			className={style.main__card}>
			<CardContent>
				<Stack>
					<Box
						position="relative"
						height={48}
						display="flex"
						alignItems="center"
						justifyContent="center">
						<Typography variant="h6" fontSize={27}>
							{card.title}
						</Typography>
						<Box position="absolute" left={0}>
							{card.icon}
						</Box>
					</Box>
					<Divider sx={{ borderBottomWidth: 3 }} />
					<Box height={16} />
					<Stack
						spacing={1}
						bgcolor={BG_PAPER}
						p={1}
						border={"5px solid"}
						borderColor={BG_THIRD}
						borderRadius="10px">
						{card.items.map(e => (
							<Box key={e.text} sx={{ display: "flex" }}>
								{e.icon}
								<Typography fontSize={17}>{e.text}</Typography>
							</Box>
						))}
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
}

export default InfoCard;
