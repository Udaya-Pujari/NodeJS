// mongodb+srv://udaysp194194:nMnG4GRBiXU3YpKt@namastenode.myad8.mongodb.net/

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://udaysp194194:nMnG4GRBiXU3YpKt@namastenode.myad8.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };
