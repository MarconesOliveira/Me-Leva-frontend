setInterval(() => {
  // eslint-disable-next-line no-undef
  const logo = document.querySelector('#logo');
  if (logo.classList.contains('animate__animated')) {
    logo.classList.remove('animate__animated', 'animate__flash');
    return;
  }
  logo.classList.add('animate__animated', 'animate__flash');
}, 5000)
