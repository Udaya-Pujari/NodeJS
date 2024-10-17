const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstname: "Udaya", lastname: "Pujari" });
});

app.post("/user", (req, res) => {
  res.send("sending the post method from user");
});

app.delete("/user", (req, res) => {
  res.send("delete method from the user");
});

app.put("/user", (req, res) => {
  res.send("put method from the user");
});

app.patch("/user",(req,res)=>{
  res.send("patch method from the user")
})

app.use("/test", (req, res) => {
  res.send("hello from test");
});

app.listen(7777, () => {
  console.log("Server is successfully running on port 7777...");
});
