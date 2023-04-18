const loginHandler = async (e) => {
    e.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if(email && password) {
        const response = await fetch('/api/user/login/', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            document.location.replace('/')
        } else {
            alert('failed to log in', response.statusText)
        }
    }

}

const signUpHandler = async (e) => {
    e.preventDefault();

    const email = document.querySelector('#signup-email').value.trim();
    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if (email && username && password) {
        const response = await fetch ('/api/user/', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok) {
            document.location.replace('/')
        } else {
            alert('failed to sign up', response.statusText)
        }

    }

}

document
  .querySelector('#login-form')
  .addEventListener('submit', loginHandler);

document
  .querySelector('#signup-form')
  .addEventListener('submit', signUpHandler);
