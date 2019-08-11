const express = require("express");
const router = express.Router();
const User = require("../Models/User");


// GET ALL USERS ROUTE
router.get("/api/users", (req, res) => {
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
router.post("/api/users/", (req, res) => {
  let user = new User(req.body)
  console.log("req.body", req.body)
  user
    .save(err => {
      if(err) {
        return res.status(404).send(err)
      } else {
        return res.status(201).join(user)
      }
    })
});

// UPDATE A USER
router.put("api/users/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id)
  console.log("req.params.id", req.params.id)
    .then(user => {
      if (!user) res.status(404).send();
      res.status(204).json(user);
    })
    .catch(err => res.status(500).send("Error, failed to update user!"));
});

// DELETE A USER
router.delete("/:id", (req, res) => {
const id = req.params.id;
User.findByIdAndRemove(id).then(deletedUser => {
  res.status(200).json(deletedUser)
})
 
});

module.exports = router;
