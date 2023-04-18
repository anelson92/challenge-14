const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/Auth');

router.get('/', async (req, res) => {
    res.render('homepage', {
       loggedIn: req.session.loggedIn 
    })
})

router.get('/login', async (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/')
        return;
    }

    res.render('login')
})

router.get('/post', async (req, res) => {
    try {
        const Posts = await Post.findAll({
            include: [{model: User}, {model: Comment}]
        })
        const blogs = Posts.map((post) =>
      post.get({ plain: true })
        );
        res.render('post', {
        blogs,
        loggedIn: req.session.loggedIn
    })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{model: User}, {model: Comment}]
        })

        const post = postData.get({plain: true})
        const postComments = post.comments;

        let allComments = [];
        let allCommentUsers = [];
       
        try {
            for(let i = 0; i < post.comments.length; i++) {
                let newUser = await User.findByPk(blog.comments[i].comment_user)
                post.comments[i].comment_username = newUser.dataValues.username
            }         
        } catch (err) {
            res.status(500).json(err)
        }

            let posterName = await User.findByPk(post.post_user_id)
            const username = posterName.username


      res.render('singlepost', {post, allCommentUsers, loggedIn: req.session.loggedIn, userId: req.session.userId, username: username})

    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/dashboard', async (req, res) => {
    try {
        console.log(req.session.userId)
        const usersPosts = await Post.findAll({
            where: {
                post_user_id: req.session.userId
            }
        })
        let userPostsData = [];
        usersPosts.forEach((userPost) => {
            userPostsData.push({
                title: userPost.dataValues.title,
                id: userPost.dataValues.id,
                body: userPost.dataValues.body
            })})

            console.log(userPostsData)


        res.render('dashboard', {usersPosts: userPostsData, 
            userId: req.session.userId, userName: req.session.username, loggedIn: req.session.loggedIn})
    } catch (err) {

    }
})

router.get('/edit/:id', async (req, res) => {
    try {
      const editPost = await Post.findByPk(req.params.id)
      
      const editingPost = editPost.dataValues;

     const postIsUsers = editingPost.post_user_id === req.session.userId

      res.render('edit', {postIsUsers: postIsUsers, post: editingPost, userId: req.session.userId, loggedIn: req.session.loggedIn})

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;