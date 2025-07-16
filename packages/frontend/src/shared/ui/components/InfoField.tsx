import Typography from "@mui/material/Typography";

function InfoField({ row, value }: { row: string; value: any }) {
	return (
		<Typography>
			<strong>{row}:</strong> {value}
		</Typography>
	);
}

export default InfoField;
