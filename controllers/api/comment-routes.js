const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const { all } = require('../home-routes');


router.post('/', async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  