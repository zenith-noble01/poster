import React from "react";
import { Link } from "react-router-dom";

const Post = ({ poster }) => {
  return (
    <div
      className="post__container"
      style={{
        height: poster.height,
      }}
    >
      <Link className="poster__img" to={`/poster/${poster.id}`}>
        {/* {<img src={poster.img} alt="" />} */}
      </Link>
    </div>
  );
};

export default Post;
