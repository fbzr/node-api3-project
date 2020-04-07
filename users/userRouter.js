const express = require('express');
const usersDb = require('./userDb');
const postsDb = require('../posts/postDb');
const validateUser = require('../middleware/validateUser');
const validateUserId = require('../middleware/validateUserId');
const validatePost = require('../middleware/validatePost');

const router = express.Router();

router.post('/', validateUser, async (req, res, next) => {
  try {
    const newUser = await usersDb.insert(req.body);
    res.status(201).json(newUser);
  } catch(err) {
    next(err);
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try {
    const newPost = await postsDb.insert({
      text: req.body.text,
      user_id: req.user.id
    });
    res.status(201).json(newPost);
  } catch(err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await usersDb.get();
    res.json(users);
  } catch(err) {
    next(err);
  }
});

router.get('/:id', validateUserId, async (req, res, next) => {
  try {
    // req.user is assigned in validateUserId
    res.json(req.user);
  } catch(err) {
    next(err);
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    const posts = await usersDb.getUserPosts(req.user.id);
    res.json(posts);
  } catch(err) {
    next(err);
  }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  try {
    await usersDb.remove(req.user.id);
    res.json({ message: 'User successfully removed' });
  } catch(err) {
    next(err);
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  try {
    const count = await usersDb.update(req.user.id, req.body);
    if (!count) {
      return res.status(400).json({ message: 'User could not be updated' });
    }

    // returns updated user
    const user = await usersDb.getById(req.user.id);
    res.json(user);
  } catch(err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(500).json({ 
    error: err,
    message: 'There was an error handling users database'
  });
});

module.exports = router;
