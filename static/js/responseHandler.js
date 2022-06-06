const handleResponse = async (response, formId) => {
    const typeForm = formId.split('-');
    if (typeForm[1] === 'register') {responseRegister(response); return;}
    if (typeForm[1] === 'login') {responseLogin(response, typeForm[2]);}
    if (typeForm[1] === 'logged') {responseLogged(response, typeForm[2]); return;}
}

const responseRegister = async(response) => {
    await changeSection('registerForms/responseFromServer').then(() => {
        const div = document.querySelector('#msg');

        if(response.has_error){
            div.innerHTML = `
            <h1 class="display-3>Error:</h1>
            <h3 class="display-5">${response.data}</h3>
            `;
            return;
        }

        div.innerHTML = `
            <div class="display-2" id="logod"><span>Cadastro concluído!</span></div> 
            <div class="display-5">Volte para a 
            <span class="link-secondary" onclick="changeSection('home')">home</span> 
            ou vá para a página de 
            <span class="link-secondary" onclick="changeSection('login')">login.</span></div>
        `;
    });
}

const responseLogin = async (response, actor) => {
    await changeSection(`loggedArea/${actor}`).then(() => {
        if(response.has_error){
            const div = document.querySelector(`#div-${actor}`);
            div.innerHTML = `<h1 class="display-3">${response.data}</h1>`;
            return;
        }
        const header = document.querySelector('#nav-bar');
        header.innerHTML = '';
        saveToken(actor, response.data);
        initMapStudent();
    });
}

const responseLogged = (response, actor) => {
    const div = document.querySelector('#msg');
    if(response.has_error){
        div.innerHTML = `<h1 class="display-3">Erro: ${response.data}</h1>`;
        return;
    }
    if (actor === 'student') {
        div.innerHTML = `
        <h1 class="display-5">Localização atualizada!</h1>
        <h3 class="lead">O <span class="logo-color">motorista ${response.data[0].name}</span> é o responsável pela sua região.</h3>
    `;
    console.log(response.data[0]);
    drawDriverOnMap(response.data[0]);
    confirmTravel('true');
    return;
    }
    if (actor === 'driver') {
        let students = '';
        response.data.forEach(element => {
            students += element.name + '  ';
        })
        drawStudentsOnMap(response.data);
        div.innerHTML = `
        <h1 class="display-5">Localização atualizada!</h1>
        <h3 class="lead">Os alunos estão esperando por você:</h3>
        <p class="lead"><span class="logo-color">${students}</span><p>
    `;
    return;
    }
}