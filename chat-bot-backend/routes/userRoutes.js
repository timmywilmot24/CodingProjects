const express = require("express");
const User = require("../models/userModel");

const users = express.Router();

users.post("/createUser", (req, res) => {
  const data = new User({
    username: req.body.username,
    first: req.body.first,
    last: req.body.last,
  });

  data
    .save()
    .then((dataToSave) => res.status(200).json(dataToSave))
    .catch((error) => res.status(400).json({ message: error.message }));
});

users.get("/getAllUsers", (req, res) => {
  User.find()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});

users.get("/getUser/:id", (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(200).send({ message: "No user was found with that ID" });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => res.status(400).json({ message: error.message }));
});

users.patch("/updateUser/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(200).send({ message: "No user was found with that ID" });
      } else {
        res.status(200).send({ message: "User updated successfully" });
      }
    })
    .catch((error) => res.status(400).json({ message: error.message }));
});

users.patch("/addUserToChat/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $push: { chats: req.body.chatID } },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(200).send({ message: "No user was found with that ID" });
      } else {
        res.status(200).send({ message: "Chat added successfully" });
      }
    })
    .catch((error) => res.status(400).json({ message: error.message }));
});

users.delete("/deleteUser/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(200).send({ message: "No user was found with that ID" });
      } else {
        res.status(200).send({ message: "User deleted successfully" });
      }
    })
    .catch((error) => res.status(400).json({ message: error.message }));
});

module.exports = users;
