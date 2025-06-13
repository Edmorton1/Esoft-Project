import { memo } from "react";
import * as styles from "@/shared/css/modules/Map.module.scss";
import Box from "@mui/material/Box";

function MapWrapper({ref}: {ref: React.RefObject<HTMLDivElement | null>}) {

  return <Box ref={ref} className={styles.map} component={"section"} bgcolor={"background.alt"}></Box>
}

export default memo(MapWrapper)