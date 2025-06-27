import { memo } from "react";
import * as styles from "@/shared/css/modules/Map.module.scss";
import Box from "@mui/material/Box";
import { BG_ALT } from "@shared/COLORS";

interface propsInterface {
  ref: React.RefObject<HTMLDivElement | null>
  height: string,
  width: string
}

function MapWrapper({ref, width, height}: propsInterface) {

  return <Box ref={ref} width={width} height={height} className={styles.map} component={"section"} bgcolor={BG_ALT} />
}

export default memo(MapWrapper)