const express = require("express");
const router = express.Router();
const User = require("../Models/User");

// GET ALL USERS ROUTE
router.get("/", (req, res) => {
  User.find().then(users => {
    res.status(200).json(users);
  });
});

// GET SINGLE USER -> Route works correctly
router.get("/api/users/:id", (req, res) => {
  User.findByID(req.params.id)
    .then(user => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({ Error: `User with that id doesn't exist...` });
    })
    .catch(err => res.status(500).json({ Error: err }));
});

// CREATE NEW USER
router.post("/", (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ Error: err }));
});

// UPDATE A USER
router.put("/api/users/:id", (req, res) => {
  User
  .findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(user => res.status(204).json(user))
    .catch(err => res.status(500).json({ Error: err }));
});

// DELETE A USER
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id).then(deletedUser => {
    res.status(200).json(deletedUser);
  });
});

module.exports = router;
