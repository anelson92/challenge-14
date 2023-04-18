const editForm = document.getElementById('edit-post')

const editPostHandle = async (e) => {
    e.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const body = document.getElementById('post-body').value
    const idString = document.getElementById('container').dataset.id
    const id = Number(idString)

    if (title && body) {
    const response = await fetch ('/api/post/' + id, {
        method: 'PUT',
        body: JSON.stringify({title, body}),
        headers: {'Content-Type': 'application/json'}
    })

    if(response.ok) {
        document.location.replace('/post')
    } else {
        alert('failed to edit')
    }

    }
}

editForm.addEventListener('submit', editPostHandle)