const express = require('express');
const postDb = require('./postDb');
const validatePost = require('../middleware/validatePost');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await postDb.get();
    res.json(posts);
  } catch(err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await postDb.getById(parseInt(req.params.id));
    if (!post) {
      return res.status(400).json({ message: 'Invalid post id' });
    }
    res.json(post);
  } catch(err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    // returns 0 if it doesn't find post
    const count = await postDb.remove(parseInt(req.params.id));
    
    if(!count) {
      return res.status(400).json({ message: 'Invalid post id' });
    }
    
    res.json({ message: 'Post successfully removed' });
  } catch(err) {
    next(err);
  }
});

router.put('/:id', validatePost, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const count = await postDb.update(id, req.body);
    if (!count) {
      return res.status(400).json({ message: 'Invalid post id' });
    }

    // returns updated post
    const post = await postDb.getById(id);
    res.json(post);
  } catch(err) {
    next(err);
  }
});

module.exports = router;
