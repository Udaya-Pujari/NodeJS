const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");
const app = express();

//Creating ths first api POST method
app.post("/signup", async (req, res) => {
  //Create an new instance of the User
  const user = new User({
    firstName: "Udaya",
    lastName: "Pujari",
    emailId: "uday@pujari.com",
    password: "uday@1234",
  });

  try {
    await user.save();
    res.send("Added the user Successfully");
  } catch (err) {
    res.status(400).send("Error Saving the user:", err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database is successfully connected");
    app.listen(7777, () => {
      console.log("Server is successfully running on port 7777...");
    });
  })
  .catch((error) => {
    console.error("can not connect to DB", error);
  });
