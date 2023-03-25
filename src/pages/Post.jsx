import "../Styles/post.scss";
import { Sidebar, Navbar } from "../components";
import { user } from "../Images";
import { BiDotsHorizontalRounded, BiSmile } from "react-icons/bi";
import { posters } from "../Constants";
import { Link, useLocation } from "react-router-dom";
const Post = () => {
  const location = useLocation();

  const pathname = location.pathname.split("/")[2];

  const post = posters.find((poster) => poster.id.toString() === pathname);

  console.log(post);
  return (
    <div className="app__post">
      <Sidebar />
      <div className="post__container outlet">
        <Navbar title="Poster" />
        <div className="poster__container">
          <div className="left__poster">
            <img src={post.img} alt="" />
          </div>
          <div className="right__poster">
            <div className="poster__header">
              <div className="user">
                <img src={post.user} alt="" />
                <p>Zenith noble</p>
              </div>
              <Link to="/messages">Message</Link>
              <BiDotsHorizontalRounded />
            </div>
            <div className="poster__desc">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                delectus fugiat soluta deleniti qui neque quae est totam odio
                provident laborum, pariatur quia. Suscipit numquam nulla in
                soluta saepe voluptatibus? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Ea delectus fugiat soluta deleniti
                qui neque quae est totam odio provident laborum, pariatur quia.
                Suscipit numquam nulla in soluta saepe voluptatibus? Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Ea delectus fugiat
                soluta deleniti qui neque quae est totam odio provident laborum,
                pariatur quia. Suscipit numquam nulla in soluta saepe
                voluptatibus? Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Ea delectus fugiat soluta deleniti qui neque quae est
                totam odio provident laborum, pariatur quia. Suscipit numquam
                nulla in soluta saepe voluptatibus? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Ea delectus fugiat soluta deleniti
                qui neque quae est totam odio provident laborum, pariatur quia.
                Suscipit numquam nulla in soluta saepe voluptatibus?
              </p>
            </div>
            <div className="poster__comment">
              <img src={user} alt="" />
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
