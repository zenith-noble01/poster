import React, { useEffect, useState } from "react";
import "../Styles/posts.scss";
import { apiRoute } from "../Constants";
import { Post } from "./";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [noPost, setNoPost] = useState("");

  useEffect(() => {
    const getAllPosts = async () => {
      const { data } = await axios.get(`${apiRoute}/post/all`);

      if (data?.msg === "No posts yet..") {
        setNoPost(data?.msg);
      }

      setPosts(
        data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    getAllPosts();
  }, []);

  return (
    <>
      {noPost ? (
        <p>{noPost}</p>
      ) : (
        <div className="home__posts">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry columnsCount={3} gutter="1rem">
              {posts?.map((poster, index) => (
                <Post poster={poster} key={index} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )}
    </>
  );
};

export default Posts;
