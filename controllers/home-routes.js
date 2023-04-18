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

router.get('/blog', async (req, res) => {
    try {
        const Posts = await Post.findAll({
            include: [{model: User}, {model: Comment}]
        })
        const blogs = Posts.map((blog) =>
      blog.get({ plain: true })
        );
        res.render('blog', {
        blogs,
        loggedIn: req.session.loggedIn
    })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Post.findByPk(req.params.id, {
            include: [{model: User}, {model: Comment}]
        })

        const blog = blogData.get({plain: true})
        const blogComments = blog.comments;

        let allComments = [];
        let allCommentUsers = [];
       
        try {
            for(let i = 0; i < blog.comments.length; i++) {
                let newUser = await User.findByPk(blog.comments[i].comment_user)
                blog.comments[i].comment_username = newUser.dataValues.username
            }         
        } catch (err) {
            res.status(500).json(err)
        }

            let posterName = await User.findByPk(blog.blog_user_id)
            const username = posterName.username


      res.render('singleblog', {blog, allCommentUsers, loggedIn: req.session.loggedIn, userId: req.session.userId, username: username})

    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/dashboard', async (req, res) => {
    try {
        console.log(req.session.userId)
        const usersBlogs = await Post.findAll({
            where: {
                blog_user_id: req.session.userId
            }
        })
        let userBlogsData = [];
        usersBlogs.forEach((userBlog) => {
            userBlogsData.push({
                title: userBlog.dataValues.title,
                id: userBlog.dataValues.id,
                body: userBlog.dataValues.body
            })})

            console.log(userBlogsData)


        res.render('dashboard', {usersBlogs: userBlogsData, 
            userId: req.session.userId, userName: req.session.username, loggedIn: req.session.loggedIn})
    } catch (err) {

    }
})

router.get('/edit/:id', async (req, res) => {
    try {
      const editBlog = await Post.findByPk(req.params.id)
      
      const editingBlog = editBlog.dataValues;

     const blogIsUsers = editingBlog.blog_user_id === req.session.userId

      res.render('edit', {blogIsUsers: blogIsUsers, blog: editingBlog, userId: req.session.userId, loggedIn: req.session.loggedIn})

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;