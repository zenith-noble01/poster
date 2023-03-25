import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    //checkUser username in db
    const checkUsername = new Promise((resolve, reject) => {
      User.findOne({ username: username }, function (err, user) {
        if (err) reject(new Error(err.message));
        if (user) reject(new Error("User already exists"));

        resolve();
      });
    });

    //checkUser username in db
    const checkEmail = new Promise((resolve, reject) => {
      User.findOne({ email: email }, function (err, user) {
        if (err) reject(new Error(err.message));
        if (user) reject(new Error("User already exists"));

        resolve();
      });
    });

    Promise.all([checkUsername, checkEmail])
      .then(() => {
        if (!password) {
          return res.status(400).send("Password is required");
        }
        //
        bcrypt
          .hash(password, 10)
          .then((hass) => {
            const user = new User({
              username: username,
              email: email,
              password: hass,
            });
            user.save().then((result) => {
              res.status(200).send({
                msg: "User created successful...",
                // user: result,
              });
            });
          })
          .catch((err) => {
            res.status(500).send({ err });
          });
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    User.findOne({ email })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((hash) => {
            const token = jwt.sign(
              {
                userId: user._id,
                email: user.email,
              },
              process.env.JWT_SECRET,
              { expiresIn: "24h" }
            );

            res.status(200).send({
              msg: "User successfully logged in",
              token,
              username: user.username,
            });
          })
          .catch((err) => {
            res.status(400).send({ msg: "Passwords don't match" });
          });
      })
      .catch((err) => {
        res.status(400).send({ msg: "User not found" });
      });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
}

export async function getUser(req, res) {
  try {
    const { username } = req.params;
    User.findOne({ username }, function (err, user) {
      if (err) return res.status(500).send({ err });
      if (!user) return res.status(404).send({ msg: "User not found" });

      const { password, ...others } = Object.assign({}, user.toJSON());

      res.status(200).send(others);
    });
  } catch (error) {
    res.status(400).send({ msg: "User not found" });
  }
}

export async function getUserById(req, res) {
  try {
    const { userId } = req.params;
    User.findById(userId)
      .then((user) => {
        const { password, ...others } = Object.assign({}, user.toJSON());

        res.status(200).send(others);
      })
      .catch((error) => {
        return res.status(404).send({ msg: "User not found" });
      });
  } catch (error) {
    res.status(400).send({ msg: "User not found" });
  }
}

export async function updateUser(req, res) {
  try {
    const { userId } = req.user;
    let hashPassword = "";

    User.findById(userId)
      .then((user) => {
        if (user._id.toString() !== userId) {
          return res
            .status(400)
            .send({ msg: "You can update only your account.." });
        } else {
          User.findByIdAndUpdate(userId, req.body, {
            new: true,
          })
            .then((user) => {
              res.status(200).send(user);
            })
            .catch((err) => {
              res.status(500).send({ msg: err.message });
            });
        }
      })
      .catch((err) => {
        return res.status(404).send({ msg: "User not found" });
      });

    console.log(hashPassword);
  } catch (error) {
    res.status(400).send({ msg: "User not found" });
  }
}

export async function deleteUser(req, res) {
  try {
    const { userId } = req.user;
    User.findByIdAndDelete(userId)
      .then((user) => {
        if (user._id.toString() !== userId) {
          return res
            .status(400)
            .send({ msg: "You can delete only your account..." });
        } else {
          res.status(201).send({ msg: "account was deleted" });
        }
      })
      .catch((err) => {
        res.status(400).send({ msg: "User not found" });
      });
  } catch (error) {}
}

export async function followUser(req, res) {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    User.findById(userId)
      .then((currentUser) => {
        User.findById(id)
          .then((user) => {
            if (!user.followers.includes(currentUser._id)) {
              user
                .updateOne({ $push: { followers: currentUser._id } })
                .then(() => {
                  currentUser
                    .updateOne({ $push: { following: user._id } })
                    .then(() => {
                      res.status(201).send({ msg: "You have followed" });
                    })
                    .catch((err) => {
                      return res
                        .status(500)
                        .send({ msg: "something went wrong" });
                    });
                })
                .catch((err) => {
                  return res.status(500).send({ msg: "something went wrong" });
                });
            } else {
              res
                .status(200)
                .send({ msg: "You are already following this user" });
            }
          })
          .catch((err) => {
            return res.status(404).send({ msg: "User not found" });
          });
      })
      .catch((err) => {
        return res.status(404).send({ msg: "User not found" });
      });
  } catch (error) {}
}

export async function unFollowUser(req, res) {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    User.findById(userId)
      .then((currentUser) => {
        User.findById(id)
          .then((user) => {
            if (user.followers.includes(currentUser._id)) {
              user
                .updateOne({ $pull: { followers: currentUser._id } })
                .then(() => {
                  currentUser
                    .updateOne({ $pull: { following: user._id } })
                    .then(() => {
                      res.status(201).send({ msg: "You have unfollowed" });
                    });
                })
                .catch((err) => {
                  return res.status(500).send({ msg: "something went wrong" });
                });
            } else {
              res.status(200).send({ msg: "You have unfollowed this user" });
            }
          })
          .catch((err) => {
            return res.status(404).send({ msg: "User not found" });
          });
      })
      .catch((err) => {
        return res.status(404).send({ msg: "User not found" });
      });
  } catch (error) {}
}

export async function getallUsers(req, res) {
  try {
    const users = await User.find();
    if (users.length === 0) {
      res.status(200).send({ msg: "No user yet..." });
    }
    res.status(200).send(users);
  } catch (error) {}
}
