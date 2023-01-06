const express = require("express");
const Chat = require("../models/chatModel");

const chats = express.Router();

chats.post("/createChat", (req, res) => {
  const data = new Chat({
    users: req.body.users,
    name: req.body.name,
    messages: req.body.messages ? req.body.messages : false,
    typing: req.body.typing ? req.body.typing : false,
  });

  data
    .save()
    .then((dataToSave) => res.status(200).json(dataToSave))
    .catch((error) => res.status(400).json({ message: error.message }));
});

chats.get("/getAllChats", (req, res) => {
  Chat.find()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});

chats.get("/getChat/:id", (req, res) => {
  Chat.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(200).send({ message: "No chat was found with that ID" });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => res.status(400).json({ message: error.message }));
});

chats.get("/getChatsByUser/:id", (req, res) => {
  Chat.find({
    users: { $eq: req.params.id },
  })
    .then((data) => {
      if (!data) {
        res.status(200).send({ message: "No chat was found with that ID" });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => res.status(400).json({ message: error.message }));
});

chats.patch("/updateChat/:id", (req, res) => {
  Chat.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(200).send({ message: "No chat was found with that ID" });
      } else {
        res.status(200).send({ message: "Chat updated successfully" });
      }
    })
    .catch((error) => res.status(400).json({ message: error.message }));
});

chats.patch("/sendMessage/:id", (req, res) => {
  let message = req.body.message;
  if (!message || !message.text || !message.sender) {
    res
      .status(400)
      .json({ message: "Message has invalid parameters. Please try again." });
  } else {
    Chat.findByIdAndUpdate(
      req.params.id,
      { $push: { messages: req.body.message } },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(200).send({ message: "No chat was found with that ID" });
        } else {
          res.status(200).send({ message: "Message sent successfully" });
        }
      })
      .catch((error) => res.status(400).json({ message: error.message }));
  }
});

chats.delete("/deleteChat/:id", (req, res) => {
  Chat.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(200).send({ message: "No chat was found with that ID" });
      } else {
        res.status(200).send({ message: "Chat deleted successfully" });
      }
    })
    .catch((error) => res.status(400).json({ message: error.message }));
});

module.exports = chats;
