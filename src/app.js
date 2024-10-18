const express = require("express");

const app = express();

// app.use(
//   "/user",
//   (req, res) => {
//     console.log("Handling the requst for user");
// res.send("Response !!");
//   },
//   (req, res) => {
//     console.log("Handling the requst for user 2!!");
//     res.send("2nd Response!!");
//   }
// );

//without next

// app.use(
//   "/user",
//   (req, res) => {
//     console.log("Handling the requst for user");
//     // res.send("Response !!");
//   },
//   (req, res) => {
//     console.log("Handling the requst for user 2!!");
//     res.send("2nd Response!!");
//   }
// );

//With next

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Handling the response for the user");
//     next();
//   },
//   (req, res) => {
//     console.log("Handling the response for the user2 ");
//     res.send("2nd response");
//   }
// );

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling the response for the user");
    next();
    res.send("res 1");
  },
  (req, res) => {
    console.log("Handling the response for the user2 ");
    res.send("2nd response");
  }
);

app.listen(7777, () => {
  console.log("Server is successfully running on port 7777...");
});
