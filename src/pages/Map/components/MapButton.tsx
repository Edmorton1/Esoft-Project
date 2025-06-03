import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ICON_SIZE = "100%"
export const sxStyleMap = {width: ICON_SIZE, height: ICON_SIZE}

const MapButton = styled(Button)({
  backgroundColor: "#fff",
  color: "#000",
  width: 40,
  height: 40,
  minWidth: 40,
  padding: 4
})

export default MapButton