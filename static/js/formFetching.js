const links = {
    "server":"http://localhost:3000"
}

const listenForm = async (path = '', idSelected = '') => {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            evt.stopPropagation();

            formData = new FormData(form);
            const formDataJSON = Object.fromEntries(formData.entries());
            
            if(form.id === 'form-register-institution') {path = 'signup_institution'; idSelected = '';}
            if(form.id === 'form-register-student') {path = 'signup_student'; idSelected = formDataJSON.select_institution;}
            if(form.id === 'form-register-driver') {path = 'signup_driver'; idSelected = formDataJSON.select_institution;}
            
            delete formDataJSON['select_institution'];
            
            try {
                fetch(`${links.server}/${path}/${idSelected}`, {
                    method: 'post',
                    headers: { "Content-type": "application/json;charset=UTF-8" },
                    body: JSON.stringify(formDataJSON)
                }).then(res => res.json()).then(res => {
                    handleResponse(res, form.id);
                });
            } catch (error) {
                console.log(error);
            }
        });
    }
}

const fetchInstitutions = async () => {
    try {
        fetch('https://me-leva-backend.herokuapp.com/list_institution')
            .then(response => response.json())
            .then(response => {
            const list_institution = document.querySelector('#select_institution');
            if (response.has_error) {
                list_institution.innerHTML += "Falha ao carregar a lista de Instituições.";
                return;
            }
            response.data.forEach(element => {
                list_institution.innerHTML += `<option value="${element.id}">${element.name}</option>`;
            });

        })
    } catch (error) {
        console.log(error);
    }
}