const saveToken = (key, token) => {
    const tokenJSON = {
        "user":key,
        "token":token.token
    }
    localStorage.setItem('token_me_leva', JSON.stringify(tokenJSON));
}

const getToken = () => {
    return JSON.parse(localStorage.getItem('token_me_leva'));
}

const logOut = () => {
    localStorage.removeItem('token_me_leva');
    changeSection('home');
}

logOut();