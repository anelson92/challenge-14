const router = require('express').Router();
const { User } = require('../../models');

//Create new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
    });
    
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    })

  } catch (err) {
    res.status(500).json(err);
  }
});

//Login 
router.post('/login', async (req, res) => {

  try {
    const userData = await User.findOne({ 
        where: { 
            username: req.body.username 
        } 
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Oops, that password or username is incorrect!' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Oops, that password or username is incorrect!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.username = User.username;
      req.session.loggedIn = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json({ message: 'No user found with those credentials.'});
  }
});

// log out
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;