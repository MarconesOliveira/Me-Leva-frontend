const listenForm = async () => {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            formData = new FormData(form);
            const formDataJSON = Object.fromEntries(formData.entries());
            try {
                fetch(form.action, {
                    method: 'post',
                    headers: { "Content-type": "application/json;charset=UTF-8" },
                    body: JSON.stringify(formDataJSON)
                }).then(res => res.json()).then(res => {
                    handleResponse(res);
                });
            } catch (error) {
                console.log(error);
            }
        });
    }
}