const router = require('express').Router();
const { Post } = require('../../models');
const { User } = require('../../models')
const { Comment } = require('../../models/Comment')

router.post('/new', async (req,res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.user_id,
        });
    
        res.status(200).json(newPost);
    } catch (err) {
    res.status(400).json(err);
    }

});

router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: { id: req.params.id }
        });
        if (!postData) {
            res.status(404).json({message: 'No post found with this id!'});
        } else {
            res.status(200).json(postData);
        }  
    } catch (err) {
        res.status(500).json(err);
    }
  })

  router.put('/:id', async (req, res) => {
    try {
  
        const postData = await Post.update({ 
              title: req.body.postTitle,
              content: req.body.postContent,
              userId: req.body.userId },
              { where: {id: req.params.id} }
        )
        if (!postData) {
            res.status(404).json({message: 'No post found with this id!'});
        } else {
            res.status(200).json(postData);
        }
    } catch (err) {
        res.status(400).json(err)
    }
  });
  
  module.exports = router;