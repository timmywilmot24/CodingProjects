const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
    },
    first: {
      required: true,
      type: String,
    },
    last: {
      required: true,
      type: String,
    },
    chats: {
      required: false,
      type: Array,
    },
  },
  { collection: "Users" }
);

module.exports = mongoose.model("Users", dataSchema);
