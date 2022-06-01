const root = document.querySelector('#root');

const changeSection = async (target) => {
    const html = await fetch(`./static/views/${target}`)
        .then(response => response.text())
    root.innerHTML = html;
}
