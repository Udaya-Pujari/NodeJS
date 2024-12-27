const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validator");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    console.log("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    // const user = req.user;
    const loggedInUser = req.user;
    // I am checking loggedInUser key should be equal to req.body key
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    // res.send(`${loggedInUser.firstName}, Profile updated succesful`);

    // this is the best way of send the response
    res.json({
      message: `${loggedInUser.firstName}, Profile updated succesful`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

profileRouter.patch("/profile/password", async (req, res) => {
  // it should take the existing password, you need to use bcrypt.compare to check existing password id correct or not
  // if existing password is valid,
  // it will take the new password
  // then you will have to check new password is stong or not, if it is strong then you will update it , if not throw error password not strong
  // user should be logged-in earlier
});

module.exports = profileRouter;
