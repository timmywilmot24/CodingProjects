const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    users: {
      required: true,
      type: Array,
    },
    name: {
      required: true,
      type: String,
    },
    messages: {
      required: false,
      type: Array,
    },
    typing: {
      required: false,
      type: String,
    },
  },
  { collection: "Chats" }
);

module.exports = mongoose.model("Chats", dataSchema);
