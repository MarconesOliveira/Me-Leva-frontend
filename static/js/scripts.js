const flashLogo = () => {
  const logo = document.querySelector('#logo');
  if (logo.classList.contains('animate__animated')) {
    logo.classList.remove('animate__animated', 'animate__flash');
    return;
  }
  logo.classList.add('animate__animated', 'animate__flash');
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName, 'animate__slower');

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve(node);
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
});

const slideImgBus = () => {
  animateCSS('#img-bus','slideOutLeft').then((element) => {

  });
  animateCSS('#text','slideInLeft').then((element) => {

  });
}

const playAudio = () => {
  const audio = document.querySelector('audio');
  audio.currentTime = 0;
  if(audio.classList.contains('sound-stopped')){
    audio.play();
    audio.classList.remove('sound-stopped');
    return;
  }
  audio.pause();
  audio.classList.add('sound-stopped');
}

setInterval(() => {
  flashLogo();
  slideImgBus();
}, 5000)