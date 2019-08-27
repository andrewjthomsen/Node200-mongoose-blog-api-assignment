const express = require("express");
const router = express.Router();
const Blog = require('../models/Blog'); 
const User = require('../models/User'); 

// Responsible for getting all blogs
router.get('/', (req, res) => {
  Blog.find()
    .then(Blogs => {
      res.status(200).json(Blogs);
    }).catch(err => res.status(500).send('Error: Unable to return all blogs. Please try again...'))
});

// Responsible for getting featured blogs
router.get('/featured', (req, res) => {
  Blog.where("featured", true)
    .then(blogs => {
      res.status(200).json(blogs);
    }).catch(err => res.status(500).send('Error: Unable to complete get request for featured blogs...'))
});

// Responsible for getting a single blog 
router.get('/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then(blogs => {
      if (!blogs) res.status(404).send();
      res.status(200).json(blogs);
    })
    .catch(err => res.status(404).send('Error: Unable to get user. Please try again!'));
});

//Responsible for creating a new blog and associating it to userId
router.post('/', (req, res) => {
  let dbUser = null;
  User.findById(req.body.author)
    .then(user => {
      dbUser = user;
      const newBlog = new Blog(req.body);
      newBlog.author = user._id;
      return newBlog.save();
    })
    .then(blog => {
      console.log(dbUser);
      dbUser.blogs.push(blog);
      dbUser.save().then(() => res.status(201).json(blog));
    }).catch(err => res.status(500).send('Error: Failed to create blog. Please try again...'))
});

// Responsible for updating an existing blog
router.put('/:id', (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body)
    .then(blogs => {
      if (!blogs) return res.status(404).send;
      res.status(204).json(blogs);
    })
    .catch(err => res.status(500).send('Error: Unable to update blog. Please try again.'))
});



// Responsible for deleting a blog
router.delete('/:id', (req, res) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(blogs => {
      if (!blogs) return res.status(200).json(blogs);
      res.status(200).json(blogs);
    })
});

module.exports = router;