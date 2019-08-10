const express = require("express");
const router = express.Router();
const User = require("../Models/User");


// HOME ROUTE
router.get("/", (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    });
});

// GET ALL USERS
router.get("/", (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })

});

// GET SINGLE USER
router.get("/api/users/:id", (req, res) => {
  User.findByID(req.params.id)
    .then(user => {
      if (!user) res.status(404).send();
      res.status(200).json(user);
    })
    .catch(err => res.status(404).send("Error, couldn't user"));
});

// CREATE NEW USER
router.post("/", (req, res) => {
  let newUser = new User(req.body)
  newUser
    .save(req.params.id)
    .then(user => res.status(201).json(user))
});

// UPDATE A USER
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id)
    .then(user => {
      if (!user) res.status(404).send();
      res.status(204).json(user);
    })
    .catch(err => res.status(500).send("Error, failed to update user!"));
});

// DELETE A USER
router.delete("/:id", (req, res) => {
  const userId = req.params.id;
  User.findByIdAndRemove(userId, (err, deletedUser) => {
    if(deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).send("404: User #$(userId) wasn't located");
    }
  });
 
});

module.exports = router;
