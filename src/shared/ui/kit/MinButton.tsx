import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const ICON_MIN_SIZE = "64px"
export const sxMinButton = {width: ICON_MIN_SIZE, height: ICON_MIN_SIZE, borderRadius: "50%"}

const MinButton = styled(Button)({
  borderRadius: '50%',
  width: 64,
  height: 64,
});

export default MinButton