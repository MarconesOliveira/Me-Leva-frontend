const root = document.querySelector('#root');

const changeSection = async (target, ...data) => {
    const html = await fetch(`./static/views/${target}`)
        .then(response => response.text())
    root.innerHTML = html;
    if(target === 'home'){initMap();}
    listenForm();
}
