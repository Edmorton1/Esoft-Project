import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const ICON_SIZE = "100%"

export const sxStyle = {width: ICON_SIZE, height: ICON_SIZE}

const CircleButton = styled(Button)({
  borderRadius: '50%',
  width: 80,
  height: 80,
});

export default CircleButton