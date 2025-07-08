import { forwardRef, memo } from "react";
import * as styles from "@app/client/shared/css/modules/Map.module.scss";
import Box from "@mui/material/Box";
import { BG_ALT } from "@app/shared/COLORS";

interface propsInterface {
  ref: React.RefObject<HTMLDivElement | null>
  height: string,
  width: string
}

const MapWrapper = forwardRef<HTMLDivElement, propsInterface>(({width, height}, ref) => {

  return <Box ref={ref} width={width} height={height} className={styles.map} component={"section"} bgcolor={BG_ALT} />
})

MapWrapper.displayName = "MapWrapper"

export default memo(MapWrapper)