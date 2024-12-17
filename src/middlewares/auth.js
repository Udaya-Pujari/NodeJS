const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    //First I am gonna get the token and validate/varifying it
    const { token } = req.cookies;
    if (!token) {
      throw new Error("The token is not valid!!!!");
    }
    const decodedObj = await jwt.verify(token, "DEV@Tinder$790");
    const { _id } = decodedObj;
    //getting the id
    const user = await User.findById(_id).exec();
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
    //
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
module.exports = { userAuth };
