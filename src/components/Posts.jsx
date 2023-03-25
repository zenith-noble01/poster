import React from "react";
import "../Styles/posts.scss";
import { posters } from "../Constants";
import { Post } from "./";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Posts = () => {
  return (
    <div className="home__posts">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry columnsCount={3} gutter="1rem">
          {posters.map((poster, index) => (
            <Post poster={poster} key={index} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Posts;
