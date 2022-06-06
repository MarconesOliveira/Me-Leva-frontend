const links = {
    "server":"https://me-leva-b.herokuapp.com"
}

const listenForm = async (path = '', idSelected = '') => {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            evt.stopPropagation();

            const formData = new FormData(form);
            const formDataJSON = Object.fromEntries(formData.entries());

            let formID = form.id;
            let requestMethod = 'POST';
            if(formID === 'form-register-institution') {path = 'signup_institution'; delete formDataJSON['select_institution'];}
            else if(formID === 'form-register-student') {path = 'signup_student'; idSelected = formDataJSON.select_institution; delete formDataJSON['select_institution'];}
            else if(formID === 'form-register-driver') {path = 'signup_driver'; idSelected = formDataJSON.select_institution; delete formDataJSON['select_institution'];}
            else if(formID === 'form-login') {path = `login_${form.loginTypeSelector.value}`; formID += `-${form.loginTypeSelector.value}`; delete formDataJSON['loginTypeSelector'];}
            else if(formID === 'form-logged-student') {path = 'localiztion_student'; idSelected = getToken().token;}
            else if(formID === 'form-logged-driver') {path = 'localiztion_driver'; idSelected = getToken().token; requestMethod = 'PUT';}

            try {
                fetch(`${links.server}/${path}/${idSelected}`, {
                    method: requestMethod,
                    headers: { "Content-type": "application/json;charset=UTF-8" },
                    body: JSON.stringify(formDataJSON)
                }).then(res => res.json()).then(res => {
                    handleResponse(res, formID);
                });
            } catch (error) {
                console.log(error);
            }
        });
    }
}

const fetchInstitutions = async () => {
    try {
        fetch(`${links.server}/list_institution`)
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

const fetchInstitutionsLocation = async (map) => {
    try {
        fetch(`${links.server}/list_institution`)
            .then(response => response.json())
            .then(response => {
            if (response.has_error) {
                return;
            }
            const svg = {
                path: "M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z",
                fillColor: "black",
                fillOpacity: 1,
                scale: 2
            }
            response.data.forEach(element => {
                const marker = new google.maps.Marker({
                    position: new google.maps.LatLng(element.latitude, element.longitude),
                    title: element.name,
                    map: map,
                    icon: svg,
                });
            });

        })
    } catch (error) {
        console.log(error);
    }
}

const confirmTravel = async (msg) => {
    msg === 'false' ? msg = false: msg = true;
    try {
        const data = {
            "travel":msg
        }
        const idSelected = getToken().token;
        fetch(`${links.server}/setTravel/${idSelected}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(res => {
            if (data.has_error) {
                return;
            }
            const div = document.querySelector('#msg');
            if (msg===false) {
                div.innerHTML = `
                <h3>Enviada a confirmação de que você não vai!</h3>
            `;
            } 
        });
    } catch (error) {
        console.log(error);
    }
}