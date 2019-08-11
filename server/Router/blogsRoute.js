const express = require("express");
const router = express.Router();
const Blog = require("../Models/Blog");
const User = require("../Models/User");

// GET ALL BLOGS
router.get("/api/blogs/", (req, res) => {
  Blog.find().then(blogs => {
    res.status(200).json(blogs);
  }).catch(e => res.status(500).send("Error"))
});

// GET ALL FEATURED BLOGS
// *ROUTE NOT WORKING
router.get("/api/blogs/featured", (req, res) => {
  Blog.where("featured")
    .equals(true)
    .then(blog => {
      res.status(200).json(featureBlogs);
    });
});

// GET SINGLE BLOG
router.get("/api/blogs/:id", (req, res) => {
  Blog.findByID(req.params.id).then(blogs => {
    if (!blogs) res.status(404).send(null)
      res.status(200).json(blog);
  }).catch(error => res.status(500).send("error"))
});

// CREATE NEW BLOG + associate to userId with .post()
// * ROUTE NOT WORKING
router.post("/api/blogs/", (req, res) => {
  // New Higher scope variable
  let dbUser;
  // Creation of new blog
  const newBlog = new Blog(req.body);

  // Fetch user in higher scope variable
  dbUser
    .findById(req.body.authorId)
    .then(user => {
      // store fetched user in the higher scope variable
      dbUser = user;
      // Bind the user
      newBlog.author = user._id;
      // save to db
      return newBlog.save();
    })
    .then(blog => {
      // Push blog to array of user's blogs
      dbUser.blogs.push(blog);
      // Save user to db and respond to http req with copied newly created blog
      dbUser.save().then(() => res.status(201).json(blog));
    });
});

// UPDATE A BLOG
// *Route isn't firing
router.put("/api/blogs/:id", (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, { $set: req.body})
  .then(blogs => {
    res.status(204).json(blogs);
  })
  .catch(e => res.status(500).send("Error, failed to update blog"))
});

// DELETE A USER
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  Blog.findByIdAndRemove(id)
    .then(blogs => {
      if (!blogs) return res.status(200).json(blogs);
      res.status(200).json(blogs);
    })
    .catch(error => res.status(404).send("Error, couldn't delete!"));
});

module.exports = router;
