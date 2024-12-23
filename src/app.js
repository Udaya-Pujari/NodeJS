const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validator");
const { userAuth } = require("./middlewares/auth");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(cookieParser());

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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //1. first I will check wether the emailId is present or not in in DB
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    //2. compare with bcrypt that my password is correct or not
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //Create a JWT Token
      // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
      //   expiresIn: "1d",
      // });
      const token = await user.getJWT();
      console.log(token);
      //Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), //this expires a cookie in 8 hrs
      });

      res.send("Login Succesful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    console.log("ERROR : " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("sending connection request");

  res.send(user.firstName + " is sending a request!");
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
