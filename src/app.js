const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/user/login", (req, res) => {
  res.send("user loggid in suceesfully");
});

app.get("/user", userAuth, (req, res) => {
  res.send("user response");
});

app.get("/admin/getAllDetails", (req, res) => {
  res.send("user Details");
});

app.get("/admin.deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.listen(7777, () => {
  console.log("Server is successfully running on port 7777...");
});
