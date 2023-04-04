import "../Styles/posts.scss";
import { Post } from "./";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import { useSearch } from "../Helper";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiRoute } from "../Constants";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [noposts, setNoPosts] = useState("");
  // const { results, isLoading, error } = useSearch();

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axios.get(`${apiRoute}/post/all`);

      if (data.msg === "No posts yet..") {
        return setNoPosts(data.msg);
      }
      setPosts(
        data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    getPosts();
  }, []);

  return (
    <>
      {noposts ? (
        <p> {noposts} </p>
      ) : (
        <div className="home__posts">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry columnsCount={3} gutter="1rem">
              {posts.map((post) => (
                <Post poster={post} key={post?._id} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )}
    </>
  );
};

export default Posts;
