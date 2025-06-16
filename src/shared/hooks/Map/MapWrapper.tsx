import { memo } from "react";
import * as styles from "@/shared/css/modules/Map.module.scss";
import Box from "@mui/material/Box";

interface propsInterface {
  ref: React.RefObject<HTMLDivElement | null>
  height: string,
  width: string
}

function MapWrapper({ref, width, height}: propsInterface) {

  return <Box ref={ref} width={width} height={height} className={styles.map} component={"section"} bgcolor={"background.alt"} />
}

export default memo(MapWrapper)