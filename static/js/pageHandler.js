const root = document.querySelector('#root');

const changeSection = async (target, ...data) => {
    const html = await fetch(`./static/views/${target}`)
        .then(response => response.text())
    root.innerHTML = html;
    if(target === 'home'){
        initMap();
        const header = document.querySelector('#nav-bar');
        if(header.innerHTML === ''){
            header.innerHTML = `
            <div class="">
                <button class="btn btn-outline-info btn-sm mx-1" onclick="changeSection('home')">Home</button>
                <button class="btn btn-outline-info btn-sm mx-1" onclick="changeSection('login')">Login</button>
                <button class="btn btn-outline-info btn-sm mx-1" onclick="changeSection('register')">Cadastre-se</button>
                <button class="btn btn-outline-light btn-sm sound-stopped mx-1" onclick="playAudio()">Sound</button>
            </div>
            `;
        }
    }
    if(target === 'registerForms/studentForm' || target === 'registerForms/driverForm'){fetchInstitutions();}
    listenForm();
}
