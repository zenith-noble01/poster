import "../Styles/post.scss";
import { Sidebar, Navbar } from "../components";
import { noAvatar } from "../Images";
import { BiDotsHorizontalRounded, BiSmile } from "react-icons/bi";
import { apiRoute } from "../Constants";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Post = () => {
  const location = useLocation();

  const [post, setPost] = useState({});
  const [user, setUser] = useState({});

  const pathname = location.pathname.split("/")[2];

  useEffect(() => {
    const getAPost = async () => {
      const { data } = await axios.get(`${apiRoute}/post/${pathname}`);
      setPost(data);
      const response = await axios.get(`${apiRoute}/auth/u/${post.userId}`);

      setUser(response.data);
    };

    getAPost();
  }, [pathname, post.userId]);

  console.log(user);
  return (
    <div className="app__post">
      <Sidebar />
      <div className="post__container outlet">
        <Navbar title="Poster" />
        <div className="poster__container">
          <div className="left__poster">
            <img src={post?.postImg} alt="" />
          </div>
          <div className="right__poster">
            <div className="poster__header">
              <div className="user">
                <img src={user?.profile ? user?.profile : noAvatar} alt="" />
                <p>{user?.username}</p>
              </div>
              <Link to="/messages">Message</Link>
              <BiDotsHorizontalRounded />
            </div>
            <div className="poster__desc">
              <p>{post?.description}</p>
            </div>
            <div className="poster__comment">
              <img src={user?.profile ? user?.profile : noAvatar} alt="" />
              <div className="input__container">
                <input type="text" placeholder="Add a comment" />
                <BiSmile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
