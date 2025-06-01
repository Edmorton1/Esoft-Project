import { memo } from "react";
import * as styles from "@/shared/css/Marker.module.scss";

function MapWrapper({ref}: {ref: React.RefObject<HTMLDivElement | null>}) {

  return <div ref={ref} className={styles.map}></div>
}

export default memo(MapWrapper)