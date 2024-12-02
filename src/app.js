const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");
const { validateSignupData } = require("./utils/validator");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());

//Creating ths first api POST method
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  try {
    // 1. validation of the data
    validateSignupData(req); //what evr the request is coming, I will validate it over here
    const { firstName, lastName, emailId, password } = req.body; //I will get pass the password from my request.body
    // 2. Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    // 3. save the user

    //creating a new instance of user model
    // const user = new User(req.body);  //this is bad way to use req.body, so ,insted mention every field explicitly
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("Added the user Successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something Went wrong");
  }
});

//Feed API-GET/feed -  get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    //to get the the user details just add the empty object, as shown in the below object
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Delete api:  by id of user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });

    // const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//update the user data: By using PATCH API
app.patch("/user/:userId", async (req, res) => {
  // const userId = req.body.userId;
  const userId = req.params?.userId;
  const data = req.body;
  try {
    //----------- API level validaton. -----------------
    const ALLOWED_UPDATES = ["photourl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Updates not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }
    // ------------------------------------------------------------
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("Update patch failed " + err.message);
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
