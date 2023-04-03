import React from "react";
import { Link } from "react-router-dom";

const Post = ({ poster }) => {
  console.log(poster);
  return (
    <div
      className="post__container"
      style={{
        height: poster.height,
      }}
    >
      <Link className="poster__img" to={`/poster/${poster?._id}`}>
        {<img src={poster?.postImg} alt="" />}
      </Link>
    </div>
  );
};

export default Post;
