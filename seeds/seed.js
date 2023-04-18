
const sequelize = require('../config/connection');
const { User, Post, Comment} = require('../models')

const commentData = {
    id: 1, 
    comment_text: "Love this!!!",
    blog_id: 1,
    comment_user: 1
  }

  const blogData = {
    id: 1,
    title: "Blog Title",
    body: "This is where a body would go!",
    blog_author: 1
  }

  const userData = {
    id: 1,
    username: "quaillover",
    email: "ilovequail@mail.com",
    password: "password123"
  }

const seedComments = () => Comment.bulkCreate(commentData);
const seedBlog = () => Post.bulkCreate(blogData);
const seedUser = () => User.create(userData);

const seedAll = async () => {

  await sequelize.sync({ force: true });
  await seedUser();
  await seedBlog();
  await seedComments();

  process.exit(0);
}

seedAll();