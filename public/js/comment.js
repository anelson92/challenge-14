const commentForm = document.getElementById('comment-form');
const commentHandle = async (e) => {
    e.preventDefault();

    const comment_body = document.getElementById('comment-body').value
    const postId = commentForm.dataset.postid;
    const userId = commentForm.dataset.userid;

    if(comment_body) {
        const post_id = Number(postId);
        const comment_user = Number(userId)
        const response = await fetch ('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({post_id, comment_user, comment_body}),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok) {
            document.location.replace('/')
        } else {
            alert('failed to comment')
        }

    }
}

commentForm.addEventListener('submit', commentHandle)