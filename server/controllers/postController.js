import cloudinary from "../config/cloudinary.js";
import Post from "../models/post.js";
import User from "../models/user.js";

const createPost = async (req, res) => {
  try {
    const { userId, postImg, description, title, isAllowed } = req.body;

    if (!Image) {
      return res.status(400).send({ msg: "image is required" });
    }

    User.findById(userId)
      .then((user) => {
        cloudinary.uploader
          .upload(postImg)
          .then((uploadedImage) => {
            const imageUrl = uploadedImage.secure_url;
            Post.create({
              userId: user._id,
              description,
              postImg: imageUrl,
              title,
              isAllowed: isAllowed,
            })
              .then((post) => {
                res.status(200).send({
                  msg: "Post successfully created",
                  post,
                });
              })
              .catch((error) => {
                return res.status(500).send({ msg: error.message });
              });
          })
          .catch((error) => {
            return res.status(400).send({ msg: "something happend" });
          });
      })
      .catch((err) => {
        return res.status(404).send({ msg: "User not found" });
      });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user;

  try {
    await Post.findById(postId)
      .then((post) => {
        if (!post) {
          return res.status(404).send({ msg: "Post not found" });
        }

        if (post.userId !== userId) {
          return res
            .status(400)
            .send({ msg: "You can only update your post!" });
        } else {
          post.save(req.body);
        }
      })
      .catch((error) => {
        return res.status(400).send({ error });
      });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts.length === 0) {
      return res.status(200).send({ msg: "No posts yet.." });
    } else {
      return res.status(200).send(posts);
    }
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

export async function getAPost(req, res) {
  try {
    const { postId } = req.params;
    Post.findById(postId)
      .then((post) => {
        res.status(200).send(post);
      })
      .catch((error) => {
        res.status(404).send({ msg: "Post not found..." });
      });
  } catch (error) {}
}

const deletePost = async (req, res) => {
  try {
    const { userId } = req.user;
    const { postId } = req.params;

    Post.findByIdAndDelete(postId)
      .then((post) => {
        if (!post) {
          return res.status(404).send({ msg: "Post not found" });
        }
        if (post.id !== userId) {
          return res
            .status(400)
            .send({ msg: "You can delete only your post..." });
        }

        res.status(200).send({ msg: "Post deleted successfully" });
      })
      .catch((error) => {
        return res.status(500).send({ msg: error.message });
      });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    Post.findById(postId)
      .then((post) => {
        if (!post.likes.includes(userId)) {
          post
            .updateOne({ $push: { likes: userId } })
            .then((post) => {
              res.status(200).send({ msg: "The post has been liked" });
            })
            .catch((err) => {
              return res.status(500).send({ msg: "could not like post" });
            });
        } else {
          post
            .updateOne({ $pull: { likes: userId } })
            .then((post) => {
              res.status(200).send({ msg: "The post has been disliked" });
            })
            .catch((err) => {
              return res.status(500).send({ msg: "could not dislike post" });
            });
        }
      })
      .catch((err) => {
        return res.status(404).send({ msg: "Post not found" });
      });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const getUserPost = async (req, res) => {
  const { username } = req.params;
  try {
    User.findOne({ username: username })
      .then((user) => {
        Post.find({ userId: user._id }).then((post) => {
          return res.status(200).send(post);
        });
      })
      .catch((err) => {
        return res.status(404).send({ msg: "user not found" });
      });
  } catch (error) {
    res.status(404).send({ msg: "....." });
  }
};

export {
  createPost,
  getAllPost,
  getUserPost,
  likePost,
  deletePost,
  updatePost,
};
