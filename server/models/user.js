import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
    },
    profile: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userModel);

export default User;
