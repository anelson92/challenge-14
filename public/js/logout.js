const logOutButton = document.getElementById('logout');

const logOut = async (event) => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log out.');
      }
    }

logOutButton.addEventListener('click', logOut)