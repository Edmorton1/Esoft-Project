import * as styles from "@/shared/css/Marker.module.scss";
import RoomIcon from "@mui/icons-material/Room";
import ReactDOM from "react-dom/client";

function MarkerMap() {
	return (
		<div className={styles.map__marker}>
			<RoomIcon
				className={styles.map__marker__room}
				sx={{color: "primary"}}
			/>
			<img
				src="https://static.vecteezy.com/system/resources/thumbnails/036/497/738/small_2x/ai-generated-black-man-in-business-suit-for-a-meeting-isolated-on-transparent-background-png.png"
				alt="avatar"
				className={styles.map__marker__avatar}
			/>
		</div>
	);
}

// const htmlMarker = renderToStaticMarkup(<MarkerMap/>)
// const el = document.createElement("div");
// el.innerHTML = htmlMarker;

const el = document.createElement("span");

ReactDOM.createRoot(el).render(<MarkerMap />);

const elClean = el.getElementsByClassName('src-shared-css-Marker-module__main')

console.log(elClean, 'elClean')
setTimeout(() => console.log(elClean[0]), 3000)

export default el;
