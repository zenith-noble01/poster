import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";

const commnetPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, text } = req.body;

    if (!userId || !text)
      return res.status(400).send({ msg: "This fields are required" });

    const post = await Post.findById(postId);

    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ msg: "User not found" });

    if (!post) return res.status(404).send({ msg: "Post not found" });

    const comment = await Comment.create({
      userId,
      postId,
      text,
    });

    res.status(200).send({ msg: "Commented Successfully", comment });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).send({ msg: error.message });
    }
    if (error.message === "Post not found") {
      return res.status(404).send({ msg: error.message });
    }
    return res.status(500).send({ msg: error.message });
  }
};

const getPostComment = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId });

    if (!comments) return res.status(404).send({ msg: "Comments not found" });

    res.status(200).send({ msg: "Comments", comments });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

export { commnetPost, getPostComment };
