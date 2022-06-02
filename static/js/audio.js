const playAudio = () => {
    const audio = document.querySelector('audio');
    audio.currentTime = 0;
    console.log(audio.paused);
    if(audio.classList.contains('sound-stopped')){
      audio.play();
      audio.classList.remove('sound-stopped');
      return;
    }
    audio.pause();
    audio.classList.add('sound-stopped');
}