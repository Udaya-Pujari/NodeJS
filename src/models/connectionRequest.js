const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //this is reference to the user collection
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

//when you call the save , this method is called each time
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  //checking fromuserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Can not send the connection request to yourself");
  }
  next();
});

const ConnectionRequestModel = new mongoose.model(
  "connectionRequestModel",
  connectionRequestSchema
);
module.exports = ConnectionRequestModel;
