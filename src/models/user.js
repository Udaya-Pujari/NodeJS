const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 100,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("your password is not strong " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validator(value) {
        if (!["male", "female", "others"] === value) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/09/43/36/57/360_F_943365717_H0GnfeYj07d4oV1xPz8WHSZgcvgFoZdW.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo url " + value);
        }
      },
    },
    about: {
      type: String,
      default: "this is a default obout of the user",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

//Creating Schema method for jwt token
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });

  return token;
};

//Creating a schema method to validate password
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

//module.exports=mongoose.model("User",userSchema)
