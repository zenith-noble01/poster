import React, { useEffect, useState } from "react";
import "../Styles/posts.scss";
import { apiRoute } from "../Constants";
import { Post } from "./";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getAllPosts = async () => {
      const { data } = await axios.get(`${apiRoute}/post/all`);

      setPosts(data);
    };
    getAllPosts();
  }, []);

  return (
    <div className="home__posts">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry columnsCount={3} gutter="1rem">
          {posts?.map((poster, index) => (
            <Post poster={poster} key={index} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Posts;
