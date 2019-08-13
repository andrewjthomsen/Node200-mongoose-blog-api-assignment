const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route responsible for getting all users
router.get('/', (req, res) => {
    User.find().then(users => {
            res.status(200).json(users);
        });
});

// Route to get a single user by id
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
              } else {
                res.status(404).send();
              }
        });
});

// Create a new user route
router.post('/', (req, res) => {
    const newUser = new User(req.body)
        newUser.save().then(newUser => {
            res.status(201).json(newUser);
        });
});
// // Route responsible for updating an existing user by id
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(updatedUser => {
            res.status(204).json(updatedUser);
        });
});
// // Route responsible for deleting a user
router.delete('/:id', (req,res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(deletedUser => {
            res.status(200).json(deletedUser);
        });
});

module.exports = router;