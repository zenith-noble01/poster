import cloudinary from "../config/cloudinary.js";
import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";

const createPost = async (req, res) => {
  try {
    const { userId, postImg, description, title, isAllowed, tags } = req.body;

    if (!postImg || !description || !title || !isAllowed) {
      return res.status(400).send({ msg: "Checkout your fields..." });
    }

    const user = await User.findById(userId);
    const uploadedImage = await cloudinary.uploader.upload(postImg);
    const imageUrl = uploadedImage.secure_url;

    const post = await Post.create({
      userId: user._id,
      description,
      postImg: imageUrl,
      title,
      isAllowed: isAllowed,
      tags: tags,
    });

    res.status(200).send({
      msg: "Post successfully created",
      post,
    });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).send({ msg: error.message });
    }
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
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({ msg: "Post not found..." });
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
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
const searchPost = async (req, res) => {
  try {
    const { q } = req.query;
    const posts = await Post.find();
    const results = q
      ? posts.filter((item) => {
          return item.tags.some((inc) => {
            return inc.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
          });
        })
      : posts;

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createPost,
  getAllPost,
  getUserPost,
  likePost,
  deletePost,
  updatePost,
  searchPost,
};
