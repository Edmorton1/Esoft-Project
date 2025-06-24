import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Subtitle = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.text.secondary,
  '&:hover': {
    textDecoration: "underline",
  },
}));

export default Subtitle