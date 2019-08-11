const express = require("express");
const router = express.Router();
const User = require("../Models/User");


// GET ALL USERS ROUTE
router.get("/", (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    });
});

// GET SINGLE USER -> Route works correctly
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
 const newUser = new User(req.body);
 newUser.save()
 .then(users => {
   res.status(201).json(users);
 })
});

// UPDATE A USER
router.put("api/users/:id", (req, res) => {
  const id = req.params.id;
 User.findByIdAndUpdate(id, {
   $set: {
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     email: req.body.email
   }
 }).then(updatedUser => {
   res.status(204).json(updatedUser);
 })
});

// DELETE A USER
router.delete("/:id", (req, res) => {
const id = req.params.id;
User.findByIdAndRemove(id).then(deletedUser => {
  res.status(200).json(deletedUser)
})
 
});

module.exports = router;
