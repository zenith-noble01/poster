import mongoose from "mongoose";

const postModel = new mongoose({
  userId: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  postImg: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  isAllowed: {
    type: Boolean,
    default: false,
  },
});

const Post = mongoose.model("user", postModel);

export default Post;