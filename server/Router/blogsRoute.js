const express = require("express");
const router = express.Router();
const Blog = require("../Models/Blog");
const User = require("../Models/User");

// GET ALL BLOGS
router.get("/", (req, res) => {
  Blog.find().then(blogs => {
    res.status(200).json(blogs);
  });
});

// GET ALL FEATURED BLOGS
router.get("/featured", (req, res) => {
  Blog.where({ featured: true })
    .then(blogs => res.status(200).json(blogs))
    .catch(err => res.status(500).json({ error: err }));
});

// GET SINGLE BLOG --> FAILING TESTING
router.get("/api/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByID(id)
    .then(blog => {
      blog
        ? res.status(200).json(blog)
        : res.status(404).json({ Error: "Couldn't locate blog with that id!" });
    })
    .catch(err => res.status(500).json({ Error: err }));
});

// CREATE NEW BLOG + associate to userId with .post()
// * ROUTE NOT WORKING
router.post("/api/blogs/", (req, res) => {
  // New Higher scope variable
  let dbUser = null;
  // Fetch user in higher scope variable
  User
    .findById(req.body.author)
    .then(user => {
      // store fetched user in the higher scope variable
      dbUser = user;

      // Creation of new blog
      const newBlog = new Blog(req.body);

      // Bind the user
      newBlog.author = user._id;
      // save to db
      return newBlog.save();
    })
    .then(blog => {
      // Push blog to array of user's blogs
      dbUser.blogs.push(blog);
      // Save user to db and respond to http req with copied newly created blog
      dbUser
        .save()
        .then(() => res.status(201).json(blog))
        .catch(err => res.status(500).json({ Error: err }));
    });
});

// UPDATE A BLOG
// *Route isn't firing
router.put("/api/blogs/:id", (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(blogs => {
      res.status(204).json(blogs);
    })
    .catch(e => res.status(500).send("Error, failed to update blog"));
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
