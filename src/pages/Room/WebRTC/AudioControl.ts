class AudioControl {
  constructor(
    readonly stream: MediaStream
  ) {
    console.log('[AudioControl] Аудио получено:', stream);
    // РЕАКЦИЯ НА СВОЙ
    const audio = document.createElement('audio');
    audio.id = 'micro';
    audio.srcObject = stream;
    audio.autoplay = true;
    audio.muted = true; // чтобы не ловить эхо
    audio.controls = true;
    document.body.appendChild(audio);
  }
}

export default AudioControl;
