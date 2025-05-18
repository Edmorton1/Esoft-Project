class VideoControl {
  constructor(
    readonly stream: MediaStream
  ) {
        console.log('[VideoControl] Video получено:', stream);
    // РЕАКЦИЯ НА СВОЙ
    const video = document.createElement('video')
    video.srcObject = stream;
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.style.width = "300px";
    video.id = 'local-video'
    document.body.appendChild(video)
  }
}

export default VideoControl