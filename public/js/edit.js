const editForm = document.getElementById('edit-blog')

const editBlogHandle = async (e) => {
    e.preventDefault();

    const title = document.getElementById('blog-title').value.trim();
    const body = document.getElementById('blog-body').value
    const idString = document.getElementById('container').dataset.id
    const id = Number(idString)

    if (title && body) {
    const response = await fetch ('/api/blog/' + id, {
        method: 'PUT',
        body: JSON.stringify({title, body}),
        headers: {'Content-Type': 'application/json'}
    })

    if(response.ok) {
        document.location.replace('/blog')
    } else {
        alert('failed to edit')
    }

    }
}

editForm.addEventListener('submit', editBlogHandle)