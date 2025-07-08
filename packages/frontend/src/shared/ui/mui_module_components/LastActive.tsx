import useLastActive from "@app/client/shared/hooks/useLastActive";
import Typography from "@mui/material/Typography";
import WifiIcon from "@mui/icons-material/Wifi";
import Box from "@mui/material/Box";
import WifiOffIcon from "@mui/icons-material/WifiOff";

interface propsInterface {
	last_active: string | undefined;
}

function LastActive({ last_active }: propsInterface) {
	const status = useLastActive(last_active);
  const isOnline = status === "Сейчас в сети"

  const color = isOnline ? "#66C0F4" : "text.secondary"
  const sx = { color }

	return (
		<Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
			{isOnline ? <WifiIcon sx={sx} fontSize="small" /> : <WifiOffIcon sx={sx} fontSize="small"/>}
			<Typography variant="body2" color={color}>
				{status}
			</Typography>
		</Box>
	);
}

export default LastActive;
