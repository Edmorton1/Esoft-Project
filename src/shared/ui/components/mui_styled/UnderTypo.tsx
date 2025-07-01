import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const UnderTypo = styled(Typography)({
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

export default UnderTypo