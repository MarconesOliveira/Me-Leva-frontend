const handleResponse = async (response, formId) => {
    const typeForm = formId.split('-');
    if (typeForm[1] === 'register') {responseRegister(response); return;}
    if (typeForm[1] === 'login') {responseLogin(response, typeForm[2]);}
}

const responseRegister = async(response) => {
    await changeSection('registerForms/responseFromServer').then(() => {
        const div = document.querySelector('#msg');

        if(response.has_error){
            div.innerHTML = response.data;
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
        const div = document.querySelector('#msg');

        if(response.has_error){
            div.innerHTML = `<h1 class="display-3">${response.data}</h1>`
            return;
        }
        console.log(response);
        div.innerHTML = `
            <div class="display-2" id="logod"><span>Login concluído!</span></div>
        `;
    });
}