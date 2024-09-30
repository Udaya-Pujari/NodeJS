const express = require("express");

const app = express();

app.use((req, res) => {
  res.send("hello from server!");
});

app.use("/test", (req, res) => {
  res.send("hello from test");
});

app.use("/hello", (req, res) => {
  res.send("hello from hello");
});

app.listen(7777, () => {
  console.log("Server is successfully running on port 7777...");
});
