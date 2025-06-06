type resolutions = 'ogg' | 'webp' | 'mp4'

function FileComponent({fileLink}: {fileLink: string}) {
	const type = fileLink.split(".").splice(-1)[0] as resolutions;

	console.log(type);
  
	switch (type) {
		case "webp":
			return <img src={fileLink} alt="" />;
		case "mp4":
			return <video controls src={fileLink}></video>;
		case "ogg":
			return <audio controls src={fileLink}></audio>;
	}
}

export default FileComponent;
