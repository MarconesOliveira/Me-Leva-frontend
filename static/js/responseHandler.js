const handleResponse = async (response, formId) => {
    if (formId.indexOf('register')) {responseRegister(response); return;}
    if (formId.indexOf('login')) {responseLogin(response);return;}
}

const responseRegister = async(response) => {
    await changeSection('registerForms/responseFromServer').then(() => {
        const div = document.querySelector('#msg');

        if(response.has_error){
            div.innerHTML = response.data.data;
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

const responseLogin = (response) => {
    
}