const express = require("express");
const mongoose = require("mongoose");

// Import routes defined in /routes below
const users = require("./routes/userRoutes");
const chats = require("./routes/chatRoutes");

const PORT = 3001;
const uri =
  "mongodb+srv://timmywilmot24:Yoshichevaltrail14!@cluster0.mtbnuhw.mongodb.net/Users?retryWrites=true&w=majority";

mongoose.connect(uri, {
  dbName: "ChatBotDatabase",
});
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(express.json());

// Put routes defined in /routes below
app.use("/api/users", users);
app.use("/api/chats", chats);

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
