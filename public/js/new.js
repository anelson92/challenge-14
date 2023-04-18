const newPostForm = document.querySelector('.new-post-form')

const newPostHandle = async (e) => {
    e.preventDefault();

    const userId = document.getElementById('userId').dataset.user;
    const title = document.getElementById('post-title').value.trim();
    const body = document.getElementById('post-body').value;

    if (title && body) {
        const response = await fetch('/api/post/', {
            method: 'POST',
            body: JSON.stringify({title, body}),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok) {
            document.location.replace('/')
            alert('New post created!')
        } else {
            alert('failed to post')
        }

    }

}

const goToEdit = (e) => {
    e.preventDefault();
    console.log('click')
    const postId = Number(e.target.parentNode.dataset.postid)
    document.location.replace('/edit/' + postId)
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll("#edit-btn").forEach(el => {
        el.addEventListener('click', goToEdit);
    });
});

newPostForm.addEventListener('submit', newPostHandle)
