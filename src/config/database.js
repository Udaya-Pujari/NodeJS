// mongodb+srv://udaysp194194:nMnG4GRBiXU3YpKt@namastenode.myad8.mongodb.net/

const mongoose = require("mongoose");

const connectDB = async () => {
  console.log(process.env.DB_CONNECTION_SECRET);
  await mongoose.connect(process.env.DB_CONNECTION_SECRET);
};

module.exports = { connectDB };
